<script setup lang="ts">
useHead({
  title: 'Legal Notice — Markus Aurich',
  meta: [
    { name: 'robots', content: 'noindex' },
  ],
})
</script>

<template>
  <main id="main-content" class="px-4 py-20">
    <div class="mx-auto max-w-3xl">
      <NuxtLink
        to="/"
        class="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
        Back
      </NuxtLink>

      <h1 class="mb-12 font-serif text-3xl font-bold tracking-tight">
        Legal Notice
      </h1>

      <section class="mb-10">
        <h2 class="mb-4 font-serif text-xl font-bold tracking-tight">
          Company Information
        </h2>
        <p class="leading-relaxed text-muted-foreground">
          MonsJovis Holding UG (haftungsbeschränkt)<br>
          c/o Aurich<br>
          Eichenallee 37<br>
          14050 Berlin, Germany
        </p>
      </section>

      <section class="mb-10">
        <h2 class="mb-4 font-serif text-xl font-bold tracking-tight">
          Represented by
        </h2>
        <p class="leading-relaxed text-muted-foreground">
          Managing Director: Markus Aurich
        </p>
      </section>

      <section class="mb-10">
        <h2 class="mb-4 font-serif text-xl font-bold tracking-tight">
          Contact
        </h2>
        <p class="leading-relaxed text-muted-foreground">
          Email:
          <a href="mailto:markus@aurich.me" class="text-foreground underline underline-offset-4 transition-colors hover:text-primary">
            markus@aurich.me
          </a>
        </p>
      </section>

      <section class="mb-10">
        <h2 class="mb-4 font-serif text-xl font-bold tracking-tight">
          Commercial Register
        </h2>
        <p class="leading-relaxed text-muted-foreground">
          Registered at Amtsgericht Charlottenburg<br>
          Registration number: HRB 214851 B
        </p>
      </section>

      <section class="mb-10">
        <h2 class="mb-4 font-serif text-xl font-bold tracking-tight">
          VAT ID
        </h2>
        <p class="leading-relaxed text-muted-foreground">
          VAT identification number: DE461182922
        </p>
      </section>

    </div>
  </main>
</template>
