export interface OverlayExpose {
	showed: boolean;
	show(opacity?: number): void;
	hide(): void;
	opacityChange(opacity: number, animate: boolean): void;
}
