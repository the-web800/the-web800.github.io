<script lang="ts">
import Door from "../Door.svelte";
import ExternalLink from "../links/ExternalLink.svelte";
import InternalLink from "../links/InternalLink.svelte";
import ElevatorButton from "./ElevatorButton.svelte";

const { initialFloor = 0 } = $props();
const getInitialFloor = () => initialFloor;
let currentFloor = $state(getInitialFloor());
let isButtonsActive = $state([false, false, false]);
let isDoorOpen = $state(true);
let currentDirection = $state("↑");
let isMoving = $state(false);
let floorTextShowing = $state(true);

let buttonPushed = false;
$effect(() => {
	currentFloor = initialFloor;
});
const doors = [
	[{ name: "Lab", href: "/lab" }], // B1
	[
		{ name: "Entrance", href: "/" },
		{ name: "About", href: "/about" },
	], // 1F
	[
		{ name: "Den", href: "/den" },
		{ name: "Studio", href: "/studio" },
		{ name: "Blog", href: "/blog" },
	], // 2F
];
async function onClickButton(nextFloor: number) {
	if (buttonPushed) return;
	if (nextFloor === currentFloor) return;

	isButtonsActive[nextFloor] = true;
	buttonPushed = true;
	if (!isDoorOpen) return;
	// --- ドア閉め 開始 ---
	await new Promise((e) => setTimeout(e, 500));
	isDoorOpen = false;
	await new Promise((e) => setTimeout(e, 1000));
	// --- ドア閉め 終了 ---

	// --- ディスプレイ変化 開始 ---
	currentDirection = nextFloor < currentFloor ? "↓" : "↑";
	isMoving = true;
	await new Promise((e) => setTimeout(e, 1000));
	floorTextShowing = false;
	await new Promise((e) => setTimeout(e, 500));
	currentFloor = nextFloor;
	floorTextShowing = true;
	await new Promise((e) => setTimeout(e, 500));
	// --- ディスプレイ変化 終了 ---

	// --- ドア開け 開始 ---
	isButtonsActive = [false, false, false];
	buttonPushed = false;
	isDoorOpen = true;
	isMoving = false;
}
</script>

<div class="w-full h-full flex flex-col justify-center items-center">
	<div
		class="fixed top-0 left-0 w-full h-full bg-olive-400 hidden md:flex justify-between"
	>
		<div class="w-8 h-full bg-stone-700"></div>
		<div class="flex w-full justify-around">
			<div class="w-2 h-full bg-gray-700"></div>
			<div class="w-2 h-full bg-gray-700"></div>
		</div>
		<div class="w-8 h-full bg-stone-700"></div>
	</div>
	<div
		class="w-full h-full relative z-20 md:w-[90%] md:h-[90%] md:border-4 border-gray-600 bg-gray-500 md:rounded-2xl flex justify-between overflow-hidden"
	>
		<!-- エレベーター左側 -->
		<div
			class="w-64 h-full bg-mist-200 hidden lg:flex flex-col items-center z-10"
		>
			<h1 class="text-4xl font-mono text-center font-bold text-stone-700 m-5">
				House800
			</h1>
			<div class="bg-gray-800 p-5 w-full flex flex-col items-center">
				<span
					class="text-2xl font-serif text-white font-bold m-2 mb-6 border-b-2 border-gray-300"
					>INFORMATION</span
				>
				<table class="elevator-information w-[80%] text-white mb-5">
					<tbody>
						<tr class="border-b border-gray-500 h-12">
							<th class="text-left font-mono font-normal">2F</th>
							<td class="text-right font-bold">Den・Studio・Blog</td>
						</tr>
						<tr class="border-b border-gray-500 h-12">
							<th class="text-left font-mono font-normal">1F</th>
							<td class="text-right font-bold">Entrance・About</td>
						</tr>
						<tr class="border-b border-gray-500 h-12">
							<th class="text-left font-mono font-normal">B1</th>
							<td class="text-right font-bold">Lab</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="h-full"></div>
			<InternalLink href="/contact" class="mb-3"> ご連絡 </InternalLink>
			<InternalLink href="/license" class="mb-3">
				ライセンスについて
			</InternalLink>
			<InternalLink href="/terms" class="mb-3"> 利用規約 </InternalLink>
			<InternalLink href="/privacy" class="mb-3">
				プライバシーポリシー
			</InternalLink>
			<div class="w-full mx-4 mb-3 border-b border-stone-400"></div>
			<ExternalLink href="https://github.com/the-web800" class="mb-3">
				GitHub
			</ExternalLink>
			<ExternalLink href="https://note.com/web800" class="mb-3">
				note
			</ExternalLink>
		</div>

		<!-- フロア -->
		<div
			class="flex-1 flex flex-col md:flex-row items-center justify-center h-full gap-10 overflow-x-scroll"
			id="doors"
		>
			<!-- ドア -->
			{#each doors[currentFloor] as door}
				<Door name={door.name} href={door.href} />
			{/each}
		</div>

		<!-- 操作盤 -->
		<div class="bg-mist-400 h-full w-40 z-10">
			<div class="flex bg-black flex-col justify-end items-center">
				<div
					class="w-32 h-40 flex flex-col items-center justify-center relative"
				>
					<div
						class="text-white text-4xl font-bold font-mono inline-block transition-opacity duration-500 h-8 mb-5 {isMoving
							? "opacity-100"
							: "opacity-0"} transform-gpu"
					>
						{currentDirection}
					</div>
					<span
						class="text-white text-4xl font-bold inline-block transition-opacity duration-500 transform-gpu {floorTextShowing
							? "opacity-100"
							: "opacity-0"}"
					>
						{#if currentFloor === 0}
							B1
						{:else}
							{currentFloor}F
						{/if}
					</span>
				</div>
				<div class="text-white text-xs text-center my-3">
					<span class="font-bold">WEB800</span>
					<table class="elevator-specs mt-2 w-24 text-xs">
						<tbody>
							<tr>
								<th class="text-left font-normal">用途</th>
								<td class="text-right font-bold">乗用</td>
							</tr>
							<tr>
								<th class="text-left font-normal">定員</th>
								<td class="text-right font-bold">1名</td>
							</tr>
							<tr>
								<th class="text-left font-normal">積載</th>
								<td class="text-right font-bold">128GB</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div
				class="w-full h-20 bg-mist-200 flex gap-2 justify-center items-center"
			>
				{#each Array(6) as _}
					<div class="bg-gray-700 w-1 h-8 rounded-full"></div>
				{/each}
			</div>
			<div class="flex flex-col mt-10 w-max mx-auto">
				<!-- ボタンたち -->
				<div class="flex items-center justify-start">
					<button type="button" onclick={() => onClickButton(2)}>
						<ElevatorButton isActive={isButtonsActive[2]}>2</ElevatorButton>
					</button>
					<span class="font-stretch-[40%] mr-2 font-light text-black"
						>Den / Studio / Blog</span
					>
				</div>
				<div class="flex items-center justify-start">
					<button type="button" onclick={() => onClickButton(1)}>
						<ElevatorButton isActive={isButtonsActive[1]}>1</ElevatorButton>
					</button>
					<span class="font-stretch-[40%] mr-2 font-light text-black"
						>Entrance / About</span
					>
				</div>
				<div class="flex items-center justify-start">
					<button type="button" onclick={() => onClickButton(0)}>
						<ElevatorButton isActive={isButtonsActive[0]}>B1</ElevatorButton>
					</button>
					<span class="font-stretch-[40%] mr-2 font-light text-black">Lab</span>
				</div>
				<div class="flex mt-16 relative justify-center">
					<ElevatorButton borderColor="border-lime-500">開</ElevatorButton>
					<ElevatorButton>閉</ElevatorButton>
					<div
						class="absolute top-0 left-0 right-0 bottom-0 bg-green-400/90 flex justify-center items-center shadow-sm shadow-gray-500"
					>
						<span class="font-bold text-red-600 text-2xl"> 故障中 </span>
					</div>
				</div>
			</div>
		</div>

		<!-- エレベーターのドア -->
		<div class="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
			<div class="mr-40 lg:ml-64 h-full">
				<div
					class="w-full h-full flex flex-row group"
					data-open={isDoorOpen}
					id="elevator-door"
				>
					<div
						class="bg-mist-300 h-full w-[50%] border-r-12 border-gray-200 transition-transform group-data-[open=true]:-translate-x-full ease-in-out duration-1000 pointer-events-auto"
					></div>
					<div
						class="bg-mist-300 h-full w-[50%] border-l-12 border-gray-200 transition-transform group-data-[open=true]:translate-x-full ease-in-out duration-1000 pointer-events-auto"
					></div>
				</div>
			</div>
		</div>
	</div>
</div>
