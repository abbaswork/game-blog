import { setupFetchMock } from '@/constants/tests';
import NavigationService from './navigation';
import '@testing-library/jest-dom';

describe('NavigationService', () => {

    const navigationService = new NavigationService();

    afterEach(() => {
        // Clean up the mock after each test
        jest.clearAllMocks();
    });

    describe('getMenuItems', () => {

        it('When 0 menu items are fetched, return an empty array', async () => {
            setupFetchMock([]);
            const test = await navigationService.getMenuItems();
            expect(test).toHaveLength(0);
        });

        it('When multiple menu items are fetched, parse the menu items correctly', async () => {
            setupFetchMock([{id: 0, title: {rendered: "test-1"}}, {id: 1, title: {rendered: "test-2"}}]);
            const test = await navigationService.getMenuItems();
            expect(test).toStrictEqual([{ text: 'test-1', href: '/test-1' }, { text: 'test-2', href: '/test-2' }]);
        });

    });


})

// describe('Search Blogs', () => {

//     it('When given empty search term, return empty array', () => {
//         const test = navigationService.parseLinks([]);
//         expect(test).toHaveLength(0);
//     });

//     it('When given search term with less then 3 characters, return empty array', () => {
//         const test = navigationService.parseLinks(mockMenuItems);
//         expect(test).toStrictEqual([{ text: 'Test Page', href: '/test-page' }]);
//     });

//     it('When given search term with more then 3 characters, return search results', () => {
//         const test = navigationService.parseLinks(mockMenuItems);
//         expect(test).toStrictEqual([{ text: 'Test Page', href: '/test-page' }]);
//     });

// });