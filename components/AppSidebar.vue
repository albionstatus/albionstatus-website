<template>
  <div class="flex">
    <!-- Off-canvas menu for mobile -->
    <div class="md:hidden">
      <Transition
        enter-active-class="transition-opacity ease-linear duration-300"
        enter-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity ease-linear duration-300"
        leave-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-show="value" class="fixed inset-0 flex z-40">
          <div v-show="value" class="fixed inset-0">
            <div class="absolute inset-0 bg-gray-600 opacity-75" />
          </div>
          <Transition
            enter-active-class="transition ease-in-out duration-300 transform"
            enter-class="-translate-x-full"
            enter-to-class="translate-x-0"
            leave-active-class="transition ease-in-out duration-300 transform"
            leave-class="translate-x-0"
            leave-to-class="-translate-x-full"
          >
            <div v-show="value" class="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <div class="absolute top-0 right-0 -mr-14 p-1">
                <button
                  class="flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-gray-600"
                  aria-label="Close sidebar"
                  @click="closeSidebar"
                >
                  <svg class="h-6 w-6 text-white" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <Logo class="flex-shrink-0 flex items-center px-5" />
                <nav class="mt-5 px-2">
                  <NuxtLink
                    v-for="({to, name, icon}, i) in links"
                    :key="to + name"
                    :to="to"
                    exact-active-class="bg-gray-100focus:outline-none hover:bg-gray-100 text-gray-900 focus:bg-gray-200"
                    :class="{'mt-1': i}"
                    class="group flex items-center px-2 py-2 text-sm leading-6 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:bg-gray-100 transition ease-in-out duration-150"
                    @click.native="closeSidebar"
                  >
                    <svg
                      class="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"
                      v-bind="icon.props"
                    >
                      <path v-bind="icon.path" />
                    </svg>
                    {{ name }}
                  </NuxtLink>
                </nav>
              </div>
            </div>
          </Transition>
          <div class="flex-shrink-0 w-14">
            <!-- Force sidebar to shrink to fit close icon -->
          </div>
        </div>
      </Transition>
    </div>

    <!-- Static sidebar for desktop -->
    <div class="hidden md:flex md:flex-shrink-0">
      <div class="flex flex-col w-64 border-r border-gray-200 bg-white">
        <div class="h-0 flex-1 flex flex-col overflow-y-auto overflow-x-hidden">
          <div class="flex justify-center items-center flex-shrink-0 pt-5 px-4">
            <Logo />
          </div>
          <!-- Sidebar component, swap this element with another sidebar if you like -->
          <nav class="mt-5 px-2 bg-white">
            <NuxtLink
              v-for="({to, name, icon}, i) in links"
              :key="to + name"
              :to="to"
              exact-active-class="bg-gray-100 hover:bg-gray-100 focus:outline-none text-gray-900 focus:bg-gray-200"
              :class="{'mt-1': i}"
              class="group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 focus:bg-gray-100 transition ease-in-out duration-150"
            >
              <svg
                class="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150"
                v-bind="icon.props"
              >
                <path v-bind="icon.path" />
              </svg>
              {{ name }}
            </NuxtLink>
          </nav>
          <ClientOnly>
            <AdWrapperSidebar />
            <AdWrapperSidebar hide-label />
          </ClientOnly>
        </div>
        <div class="flex-shrink-0 flex border-t border-gray-200 p-4">
          <button class="w-full flex-shrink-0 group flex items-center" @click="authorizePushNotifications">
            <svg class="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                clip-rule="evenodd"
                fill-rule="evenodd"
              />
            </svg>
            <span class="ml-4 inline-block text-sm leading-5 font-medium text-gray-700 group-hover:text-gray-900">
              Get push notifications
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdWrapperSidebar from '@/components/AdWrapperSidebar'
import { authorizeNotification } from '@/shared/NotificationService'

export default {
  components: {
    AdWrapperSidebar
  },
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  setup (_, ctx) {
    const links = [
      {
        name: 'Server status',
        to: '/',
        icon: {
          props: {
            fill: 'none',
            stroke: 'currentColor',
            viewBox: '0 0 24 24'
          },
          path: {
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            'stroke-width': '2',
            d: 'M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10M9 21h6'
          }
        }
      },
      {
        name: 'Uptime charts',
        to: '/charts/',
        icon: {
          props: {
            fill: 'none',
            stroke: 'currentColor',
            viewBox: '0 0 24 24'
          },
          path: {
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
            'stroke-width': '2',
            d: 'M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
          }
        }
      },
      {
        name: 'Daily Maintenance',
        to: '/daily-maintenance/',
        icon: {
          props: {
            fill: 'currentColor',
            viewBox: '0 0 20 20'
          },
          path: {
            'clip-rule': 'evenodd',
            'fill-rule': 'evenodd',
            d: 'M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
          }
        }
      },
      {
        name: 'Server Location',
        to: '/server-location/',
        icon: {
          props: {
            fill: 'currentColor',
            viewBox: '0 0 20 20'
          },
          path: {
            'clip-rule': 'evenodd',
            'fill-rule': 'evenodd',
            d: 'M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z'
          }
        }
      },
      {
        name: 'AlbionStatus FAQ',
        to: '/faq/',
        icon: {
          props: {
            fill: 'currentColor',
            viewBox: '0 0 20 20'
          },
          path: {
            'clip-rule': 'evenodd',
            'fill-rule': 'evenodd',
            d: 'M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z'
          }
        }
      }
    ]

    return {
      links,
      closeSidebar: () => ctx.emit('input', false),
      authorizePushNotifications: () => { authorizeNotification() }
    }
  }
}
</script>
