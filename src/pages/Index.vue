<template>
  <div>
    <div class="flex flex-wrap flex-col w-full text-center mx-auto mt-2 mb-8">
      <span class="mt-2 mb-1 text-sm text-grey-dark">Advertisement</span>
      <ad ad-class="w-full mx-auto mb-2" ad-client="ca-pub-4749840658812364" ad-slot="6721996033"/>
    </div>
    <div class="container px-4 pt-0 pb-6 mx-auto">
      <server-status/>
      <div class="text-center my-4 py-2">
        <router-link to="charts" class="underline text-2xl text-black">
          Uptime charts have arrived!
        </router-link>
      </div>
      <h1 class="text-center mt-8 pt-4 text-grey-darkest mb-2">AlbionStatus</h1>
      <p class="text-lg leading-loose font-serif text-grey-darker">
        AlbionStatus is your <span class="text-black">reliable</span> Albion Online server status tracker! Operating
        since
        <span class="text-black">{{creationDate | moment('MMM Do YYYY')}}</span> (already
        <span class="text-black">{{creationDate | moment('from', new Date(), true)}}</span> by now 🎉), it was the
        first Albion Online server status tracker <strong class="text-black">ever!</strong> The project was created when
        no server status page was available and Albion Online devs announced the server status changes manually.
        Additionally, there were heavy DDoS attacks against the servers. AlbionStatus was built to allow players to stay
        informed about the Albion Online server status while doing something else, like watching videos or playing
        something else. The key goal was to make refreshing the server status page and client obsolete, and I'm quite
        sure that we reached it!<br><br>
        We also have a
        <a href="https://twitter.com/AlbionStatus" target="_blank" rel="noopener"
           class="text-grey-darkest group hover:text-black no-underline">
          <i class="fa fa-fw fa-twitter text-blue-light group-hover:text-blue"></i>-bot
        </a> which you can follow to stay up to date about the server status.
        Be sure to take a look into the
        <router-link to="faq" class="no-underline text-grey-darkest hover:text-black my-2 md:my-0">
          <i class="fa fa-fw fa-info"></i> FAQ
        </router-link>
        if you haven't done that by now!
      </p>
      <h2 class="text-center mt-8 pt-4 text-grey-darkest mb-2">Open Source</h2>
      <p class="text-lg leading-loose font-serif text-grey-darker">
        Also, AlbionStatus is the first open source tracker for the servers of Albion Online. If you are interested how
        the tech stack looks like, what queries we do and how we save the data, check out our
        <a href="https://github.com/manniL/albionstatus-website/"
           class="text-grey-darker hover:text-black"
           rel="noopener" target="_blank">three</a>
        <a href="https://github.com/manniL/albionstatus-microservice/"
           class="text-grey-darker hover:text-black"
           rel="noopener" target="_blank">GitHub</a>
        <a href="https://github.com/manniL/albionstatus-scraper-bot/"
           class="text-grey-darker hover:text-black"
           rel="noopener" target="_blank">repos</a>! Thanks a lot to all contributors who helped building AlbionStatus.
      </p>
      <h2 class="text-center mt-8 pt-4 text-grey-darkest mb-2">What's next?</h2>
      <p class="text-lg leading-loose font-serif text-grey-darker">
        Oh, great question! There are several more features planned:
      </p>
      <ul class="text-lg leading-loose font-serif text-grey-darker">
        <li>Uptime charts 📊</li>
        <li>Server status widget 🔌</li>
        <li>CLI/Bot support 🤖</li>
        <li>Push notifications on server status change 👈🏼</li>
        <li>More sources of truth for the server status ➕</li>
      </ul>
      <p class="text-lg leading-loose font-serif text-grey-darker">
        If you are interested in contributing towards the project, just do it 😊. Take an issue (or open one) to
        signal that you want to work on it or submit a PR if you are on it!
      </p>
    </div>
    <div class="flex flex-wrap flex-col w-full text-center mx-auto mb-2 mt-8">
      <ad ad-class="w-full mx-auto mb-2" ad-client="ca-pub-4749840658812364" ad-slot="6721996033"/>
      <span class="mt-2 mb-1 text-sm text-grey-dark">Advertisement</span>
    </div>
  </div>
</template>

<script>
  import ServerStatus from '../components/ServerStatus'

  export default {
    name: 'index',
    components: {ServerStatus},
    props: {
      creationDate: {
        required: false,
        type: String,
        default: '2017-07-29T08:09:11.0Z'
      }
    }
  }
</script>
