<script lang="ts" setup>
defineProps<{ loading: boolean }>();
</script>

<template>
	<transition name="fade">
		<div
			v-if="loading"
			class="flex flex-col mt-4 justify-center items-center absolute left-1/2"
		>
			<div class="relative grid place-items-center">
				<div class="w-6 h-6 absolute rounded-full bg-white border-2 ani border-slate-800 animate-ping"></div>
				<div class="w-3 h-3 rounded-full bg-white border-2 animation-delay-150 border-slate-800 animate-ping"></div>
			</div>
		</div>
	</transition>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
