export interface ITextDocument {
    uri: { toString(): string };
}

export class AutoSaveService {
    private timers: Map<string, NodeJS.Timeout> = new Map();

    constructor(private saveCallback: (document: ITextDocument) => Promise<boolean>) { }

    public handleDocumentChange(document: ITextDocument, delay: number): void {
        const key = document.uri.toString();
        this.clearTimer(key);

        const timer = setTimeout(async () => {
            await this.saveCallback(document);
            this.timers.delete(key);
        }, delay);

        this.timers.set(key, timer);
    }

    public handleDocumentClose(document: ITextDocument): void {
        this.clearTimer(document.uri.toString());
    }

    public dispose(): void {
        for (const key of this.timers.keys()) {
            this.clearTimer(key);
        }
    }

    private clearTimer(key: string): void {
        const timer = this.timers.get(key);
        if (timer) {
            clearTimeout(timer);
            this.timers.delete(key);
        }
    }
}
