import React from 'react'

const SideBar = () => {
  return (
    <div class="main-menu menu-fixed menu-light menu-accordion    menu-shadow " data-scroll-to-active="true" data-img="theme-assets/images/backgrounds/02.jpg">
      <div class="navbar-header">
        <ul class="nav navbar-nav flex-row">
          <li class="nav-item mr-auto">
            <a class="navbar-brand" href="index.html">
              <img class="brand-logo" alt="Chameleon admin logo" src="theme-assets/images/logo/logo.png" />
              <h3 class="brand-text">Chameleon</h3>
            </a>
          </li>
          <li class="nav-item d-md-none">
            <a class="nav-link close-navbar">
              <i class="ft-x"></i>
            </a>
          </li>
        </ul>
      </div>
      
      <div class="main-menu-content">
        <ul class="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation">
          <li class="active">
            <a href="index.html">
              <i class="ft-home"></i>
              <span class="menu-title" data-i18n="">Dashboard</span>
            </a>
          </li>
          <li class=" nav-item">
            <a href="/AddSubscription">
              <i class="ft-pie-chart"></i>
              <span class="menu-title" data-i18n="">Subscriptions</span>
            </a>
          </li>

          <li class=" nav-item">
            <a href="/add-get-Organization">
              <i class="ft-pie-chart"></i>
              <span class="menu-title" data-i18n="">Organization</span>
            </a>
          </li>

        </ul>
      </div>

      <div class="navigation-background"></div>
    </div>
  )
}

export default SideBar