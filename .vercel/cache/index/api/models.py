import json
from typing import TypeVar, TypedDict

import openai
from pydantic import BaseModel, ValidationError

Model = TypeVar("Model", bound=BaseModel)


class Example(TypedDict):
    input: str
    output: str | dict


class OpenAiMixin:
    @classmethod
    def from_openai(
        cls: Model,
        temperature=0,
        model="gpt-3.5-turbo",
        retries=2,
        examples: list[Example] = None,
        **kwargs,
    ):

        assert cls.__doc__ and (
            doc := cls.__doc__.strip()
        ), "please add a docstring explaining how to destructure the prompt"

        assert (
            examples or kwargs
        ), "please provide either examples or keyword args for the docstring"
        assert 0 <= temperature <= 1, "temperature should be between 0 and 1"
        assert retries >= 0, "retries should be a positive integer"
        directions = [
            "Respond ONLY with valid json that conforms to this json_schema:",
            cls.schema_json(),
            "Don't include additional text other than the object.",
        ]

        system_message = {
            "role": "system",
            "content": "\n".join(directions),
        }

        messages = [system_message]
        if examples:
            for example in examples:
                input_ = example["input"]
                output = example["output"]
                if isinstance(output, str):
                    try:
                        output = cls.parse_raw(output).json()
                    except ValidationError as e:
                        class_name = cls.__name__
                        raise e from ValueError(
                            f"output ({output}) should be a json representation of {class_name} or an instance of it"
                        )
                elif isinstance(output, dict):
                    output = cls.parse_obj(output).json()
                else:
                    output = output.json()
                messages.append({"role": "user", "content": input_})
                messages.append({"role": "assistant", "content": output})
        prompt = doc.format(**kwargs)
        messages.append(
            {
                "role": "user",
                "content": prompt,
            }
        )
        attempt = 0
        last_exception = None
        while attempt <= retries:
            try:
                content = openai.ChatCompletion.create(
                    messages=messages,
                    temperature=temperature,
                    model=model,
                )["choices"][0]["message"]["content"]
                obj = json.loads(content)
            except Exception as e:
                last_exception = e
                error_msg = f"{e.__class__.__name__}: {e}"
                messages.append(
                    {
                        "role": "user",
                        "content": (
                            error_msg
                            + "\n"
                            + "note: Don't apologize. simply return the correct json object"
                        ),
                    }
                )
                attempt += 1
                continue
            try:
                return cls.parse_obj(obj)
            except ValidationError as e:
                last_exception = e
                error_msg = f"pydantic.ValidationError: {e}"
                messages.append(
                    {"role": "user", "content": f"{e.__class__.__name__}: {e}"}
                )
                attempt += 1
        if last_exception:
            raise last_exception

class OpenAIModel(OpenAiMixin,BaseModel):
    pass