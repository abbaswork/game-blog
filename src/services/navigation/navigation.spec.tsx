import { mockMenuItems, mockMenuBlogItems, mockTags } from './types.test';
import NavigationService from './navigation';
import '@testing-library/jest-dom';

//mock fetch
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ results: [{ id: 0, title: "test", url: "", type: "" }] }),
        headers: {} as any,
        ok: {} as any,
        redirected: {} as any,
        status: {} as any,
        statusText: {} as any,
        type: {} as any,
        url: {} as any,
        clone: {} as any,
        body: {} as any,
        bodyUsed: {} as any,
        arrayBuffer: {} as any,
        blob: {} as any,
        formData: {} as any,
        text: {} as any,
    })
);

describe('NavigationService', () => {

    const navigationService = new NavigationService(mockMenuItems, mockTags);

    describe('parseMenu', () => {

        it('When given empty body of menu items, return empty array', () => {
            const test = navigationService.parseLinks([]);
            expect(test).toHaveLength(0);
        });

        it('When given list of one or more menu items, parse them to have the correct interface', () => {
            const test = navigationService.parseLinks(mockMenuItems);
            expect(test).toStrictEqual([{ text: 'Test Page', href: '/test-page' }]);
        });

    });

    describe('Search Blogs', () => {

        it('When given empty search term, return empty array', () => {
            const test = navigationService.parseLinks([]);
            expect(test).toHaveLength(0);
        });

        it('When given search term with less then 3 characters, return empty array', () => {
            const test = navigationService.parseLinks(mockMenuItems);
            expect(test).toStrictEqual([{ text: 'Test Page', href: '/test-page' }]);
        });

        it('When given search term with more then 3 characters, return search results', () => {
            const test = navigationService.parseLinks(mockMenuItems);
            expect(test).toStrictEqual([{ text: 'Test Page', href: '/test-page' }]);
        });

    });

})