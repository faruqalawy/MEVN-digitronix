<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <div class="mx-auto h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
          <div class="bg-green-100 dark:bg-green-900 rounded-full p-4 inline-flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-8 w-8 text-green-500 dark:text-green-400"
            >
              <path d="M20 6 9 17l-5-5"></path>
            </svg>
          </div>
        </div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">
          Payment Successful
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Thank you for your purchase!
        </p>
      </div>
      <div class="flex justify-center">
        <img
          src="https://res.cloudinary.com/dnwvsqlh1/image/upload/f_auto,q_auto/v1/digitronix/payment-success"
          width="300"
          height="300"
          alt="Payment Success"
          class="max-w-[300px]"
          style=" object-fit: cover"
        />
      </div>
      <div>
        <button
          class="w-full inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <a href="/">Continue to Dashboard</a>
        </button>
      </div>
    </div>
  </div>

  <div class="bg-white dark:bg-gray-800 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md mx-auto space-y-8">
      <div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">Purchase Details</h3>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Plan</p>
          <p class="text-base font-medium text-gray-900 dark:text-gray-100">Pro</p>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Billing Frequency</p>
          <p class="text-base font-medium text-gray-900 dark:text-gray-100">Monthly</p>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Amount</p>
          <p class="text-base font-medium text-gray-900 dark:text-gray-100">$49.00</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script></script>

<style scoped>
body {
  font-family: 'Libre Franklin', sans-serif;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Arimo', sans-serif;
}
</style>
