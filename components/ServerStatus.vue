<script setup lang="ts">
import type { DurationUnits } from 'luxon'
import { DateTime } from 'luxon'

const { status: statusWashington, statusClasses: statusClassesWashington, message: messageWashington, showMessage: showMessageWashington, formattedLastCheckedAt } = useStatus('was')
const { status: statusSingapore, statusClasses: statusClassesSingapore, message: messageSingapore, showMessage: showMessageSingapore } = useStatus('sgp')
const { status: statusAmsterdam, statusClasses: statusClassesAmsterdam, message: messageAmsterdam, showMessage: showMessageAmsterdam } = useStatus('ams')

const units: DurationUnits = ['years', 'months', 'days', 'hours']
const duration = DateTime.local().diff(DateTime.fromISO(DATE_OF_CREATION), units)
const operatingSince = units.map(u => duration.get(u) && `${Math.ceil(duration.get(u))} ${u}`)
  .filter(Boolean)
  .join(', ')
  .replace(/,([^,]*)$/, ' and $1')
</script>

<template>
  <div class="mt-4 lg:mt-16 pt-4 lg:pt-16 pb-4 lg:pb-12 bg-gray-100 rounded">
    <div class="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <dl class="rounded-t-lg bg-white shadow-lg">
          <div class="sm:grid sm:grid-cols-2 rounded-t-lg bg-white border-b">
            <div class="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
              <dt id="item-1" class="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                Albion Main Server status
              </dt>
              <dd class="order-1 text-5xl leading-none font-extrabold" :class="statusClassesWashington"
                aria-describedby="item-1">
                {{ statusWashington }}
              </dd>
            </div>
            <div class="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
              <dt id="item-2" class="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                Albion Asia Server status
              </dt>
              <dd class="order-1 text-5xl leading-none font-extrabold" :class="statusClassesSingapore"
                aria-describedby="item-2">
                {{ statusSingapore }}
              </dd>
            </div>
          </div>
          <div class="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
            <dt id="item-2" class="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
              Albion Europe Server status
            </dt>
            <dd class="order-1 text-5xl leading-none font-extrabold" :class="statusClassesAmsterdam"
              aria-describedby="item-2">
              {{ statusAmsterdam }}
            </dd>
          </div>
        </dl>
        <dl class="border-t rounded-b-lg bg-white shadow-lg sm:grid sm:grid-cols-1">
          <div
            class="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
            <dt class="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
              Last checked at
            </dt>
            <dd class="order-1 text-5xl leading-none font-extrabold text-indigo-600" aria-describedby="item-2">
              {{ formattedLastCheckedAt }}
            </dd>
          </div>
        </dl>
        <Transition enter-active-class="transition-opacity ease-linear duration-300" enter-class="opacity-0"
          enter-to-class="opacity-100" leave-active-class="transition-opacity ease-linear duration-300"
          leave-class="opacity-100" leave-to-class="opacity-0">
          <dl v-if="showMessageSingapore || showMessageWashington || showMessageAmsterdam"
            class="mt-4 rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-1">
            <div class="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
              <dd class="text-3xl leading-none text-center text-gray-700">
                <p v-show="showMessageWashington">
                  Albion Main (Washington): {{ messageWashington }}<br>
                </p>
                <p v-show="showMessageSingapore">
                  Albion Asia (Singapore): {{ messageSingapore }}
                </p>
                <p v-show="showMessageAmsterdam">
                  Albion Europe (Amsterdam): {{ messageAmsterdam }}
                </p>
              </dd>
            </div>
          </dl>
        </Transition>
        <dl class="mt-4 rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-1">
          <div
            class="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
            <dt class="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
              Operating since
            </dt>
            <dd class="order-1 text-4xl leading-none font-extrabold text-gray-500">
              {{ operatingSince }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>
