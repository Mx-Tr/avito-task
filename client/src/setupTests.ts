import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Старый мок для matchMedia
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: vi.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: vi.fn(),
		removeListener: vi.fn(),
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
	})),
});

// НОВЫЙ МОК для getComputedStyle
Object.defineProperty(window, 'getComputedStyle', {
	value: () => ({
		getPropertyValue: (_prop: any) => {
			return '';
		},
	}),
});