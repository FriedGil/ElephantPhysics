<script>
    import "carbon-components-svelte/css/g10.css";
    import '@carbon/charts/styles.css';
    
    import {
      Header,
      HeaderNav,
      HeaderNavItem,
      HeaderNavMenu,
      SideNav,
      SideNavItems,
      SideNavMenu,
      SideNavMenuItem,
      SideNavLink,
      SkipToContent,
      Content,
      Grid,
      Row,
      Column,
    } from "carbon-components-svelte";
  
    let isSideNavOpen = false;

    function close(){
      isSideNavOpen = false;
    }
  </script>
  
  <Header
    persistentHamburgerMenu={true}
    company="Elephant"
    platformName="Physics"
    bind:isSideNavOpen
  >
    <svelte:fragment slot="skip-to-content">
      <SkipToContent />
    </svelte:fragment>
  </Header>
  
  <SideNav bind:isOpen={isSideNavOpen}>
    <SideNavItems>
      <SideNavLink href="/" on:click={close} text="Home" />
      <SideNavLink href="/methodology" on:click={close} text="Methodology" />
      <SideNavLink href="/load" on:click={close} text="Explore" />
      <SideNavMenu text="Examples">
        <a data-sveltekit-reload href="/">
          <SideNavMenuItem   on:click={close} text="Projectile Motion" />
        </a>
        <a data-sveltekit-reload href="/load/(dynamicBodies:((id:Elephant+1,x:80,y:50,vx:100,vy:0,ax:0,ay:0,mass:10,radius:50),(id:Elephant+2,x:300,y:50,vx:0,vy:0,ax:0,ay:0,mass:10,radius:50),(id:Ball+1,x:80,y:200,vx:100,vy:0,ax:0,ay:0,mass:10,radius:40),(id:Ball+2,x:300,y:200,vx:0,vy:0,ax:0,ay:0,mass:20,radius:60),(id:Ball+3,x:80,y:400,vx:100,vy:0,ax:0,ay:0,mass:20,radius:60),(id:Ball+4,x:300,y:400,vx:0,vy:0,ax:0,ay:0,mass:10,radius:40)),world:(),objects:())">
          <SideNavMenuItem   on:click={close} text="Collisions" />
        </a>
        <SideNavMenuItem data-sveltekit-reload href="/" on:click={close} text="Pendulum" />
      </SideNavMenu>
    </SideNavItems>
  </SideNav>
  
  <Content>
    <slot/>
  </Content>
  
