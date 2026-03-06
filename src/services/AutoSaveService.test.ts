import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AutoSaveService, ITextDocument } from './AutoSaveService';

describe('AutoSaveService', () => {
    let service: AutoSaveService;
    let saveCallback: (doc: ITextDocument) => Promise<boolean>;

    beforeEach(() => {
        vi.useFakeTimers();
        saveCallback = vi.fn().mockResolvedValue(true);
        service = new AutoSaveService(saveCallback);
    });

    it('should trigger save after delay', async () => {
        const doc: ITextDocument = { uri: { toString: () => 'file://test.txt' } };
        service.handleDocumentChange(doc, 500);

        expect(saveCallback).not.toHaveBeenCalled();

        vi.advanceTimersByTime(500);
        await vi.runAllTimersAsync();

        expect(saveCallback).toHaveBeenCalledWith(doc);
    });

    it('should debounce multiple changes', async () => {
        const doc: ITextDocument = { uri: { toString: () => 'file://test.txt' } };
        service.handleDocumentChange(doc, 500);
        vi.advanceTimersByTime(300);
        service.handleDocumentChange(doc, 500);
        vi.advanceTimersByTime(300);

        expect(saveCallback).not.toHaveBeenCalled();

        vi.advanceTimersByTime(200);
        await vi.runAllTimersAsync();

        expect(saveCallback).toHaveBeenCalledTimes(1);
    });

    it('should handle multiple documents independently', async () => {
        const doc1: ITextDocument = { uri: { toString: () => 'file:///test1.txt' } };
        const doc2: ITextDocument = { uri: { toString: () => 'file:///test2.txt' } };

        service.handleDocumentChange(doc1, 500);
        service.handleDocumentChange(doc2, 1000);

        await vi.advanceTimersByTimeAsync(500);

        // At this point doc1 should be saved
        expect(saveCallback).toHaveBeenCalledWith(doc1);
        // doc2 should not have been saved yet (call count should be 1)
        expect(saveCallback).toHaveBeenCalledTimes(1);

        await vi.advanceTimersByTimeAsync(500);

        // Now both should be saved
        expect(saveCallback).toHaveBeenCalledWith(doc2);
        expect(saveCallback).toHaveBeenCalledTimes(2);
    });

    it('should cancel timer on document close', async () => {
        const doc: ITextDocument = { uri: { toString: () => 'file://test.txt' } };
        service.handleDocumentChange(doc, 500);
        service.handleDocumentClose(doc);

        vi.advanceTimersByTime(500);
        await vi.runAllTimersAsync();

        expect(saveCallback).not.toHaveBeenCalled();
    });
});
