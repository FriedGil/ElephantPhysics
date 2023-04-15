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
        <SideNavMenuItem href="/" on:click={close} text="Collisions" />
        <SideNavMenuItem href="/" on:click={close} text="Pendulum" />
        <SideNavMenuItem href="/" on:click={close} text="Projectile Motion" />
      </SideNavMenu>
    </SideNavItems>
  </SideNav>
  
  <Content>
    <slot/>
  </Content>
  
