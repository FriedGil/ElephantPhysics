from flask import Flask
import lmql
import os

app = Flask(__name__)
OPENAI_API_KEY = os.environ.get('VITE_OPENAI_API_KEY')



@app.route('/api/')
async def test():
    data = (await hello())[0].prompt
    return data



@lmql.query
async def hello():
    '''lmql
    argmax
        "Hello[WHO]"
    from
        "openai/text-ada-001"
    where
        len(WHO) < 10
    '''


if __name__ == "__main__":
    app.run()
