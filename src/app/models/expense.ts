export class Expense {
    constructor(
        public date: Date,
        public description: string,
        public amount: string
    ) { }

    // Method to convert Expense object to JSON
    toJSON(): string {
        return JSON.stringify({
            date: this.date,
            description: this.description,
            amount: this.amount
        });
    }

    // Static method to create Expense object from JSON
    static fromJSON(json: string): Expense {
        const { date, description, amount } = JSON.parse(json);
        return new Expense(new Date(date), description, amount);
    }
}
