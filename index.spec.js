describe('Test deck', () => {
    it('The deck will have 52 cards', () => {
        const deck = new Deck();
        expect(deck.deck.length).toBe(52);
    });

    it('Draw 5 cards from the deck', () => {
        const deck = new Deck();
        expect(deck.drawCards().length).toBe(5);
    });

    it('Check number of cards on deck after withdrawing 5 cards', () => {
        const deck = new Deck();
        deck.drawCards();
        expect(deck.remainCards()).toBe(47);
    });
});

describe('Test game logic', () => {
    it('Evaluate cards on hand is a Royal flush', () => {
        const cardsOnHand = [
            {
                suit: 'Heart',
                value: 10
            },
            {
                suit: 'Heart',
                value: 11
            },
            {
                suit: 'Heart',
                value: 12
            },
            {
                suit: 'Heart',
                value: 13
            },
            {
                suit: 'Heart',
                value: 1
            }
        ];
        const result = calculateHandRanking(cardsOnHand);
        expect(calculateHandRanking(cardsOnHand)).toBe('Royal flush');
    });

    it('Evaluate cards on hand is a Straight flush', () => {
        const cardsOnHand = [
            {
                suit: 'Heart',
                value: 5
            },
            {
                suit: 'Heart',
                value: 8
            },
            {
                suit: 'Heart',
                value: 6
            },
            {
                suit: 'Heart',
                value: 9
            },
            {
                suit: 'Heart',
                value: 7
            }
        ];
        const result = calculateHandRanking(cardsOnHand);
        expect(calculateHandRanking(cardsOnHand)).toBe('Straight flush');
    });

    it('Evaluate cards on hand is a Straight', () => {
        const cardsOnHand = [
            {
                suit: 'Spades',
                value: 5
            },
            {
                suit: 'Heart',
                value: 6
            },
            {
                suit: 'Clubs',
                value: 7
            },
            {
                suit: 'Diamonds',
                value: 8
            },
            {
                suit: 'Spades',
                value: 9
            }
        ];
        const result = calculateHandRanking(cardsOnHand);
        expect(calculateHandRanking(cardsOnHand)).toBe('Straight');
    });

    it('Evaluate cards on hand is a HighCards', () => {
        const cardsOnHand = [
            {
                suit: 'Spades',
                value: 9
            },
            {
                suit: 'Heart',
                value: 2
            },
            {
                suit: 'Clubs',
                value: 4
            },
            {
                suit: 'Diamonds',
                value: 8
            },
            {
                suit: 'Spades',
                value: 10
            }
        ];
        const result = calculateHandRanking(cardsOnHand);
        expect(calculateHandRanking(cardsOnHand)).toBe('HighCards');
    });

    it('Evaluate cards on hand is a Pair', () => {
        const cardsOnHand = [
            {
                suit: 'Spades',
                value: 5
            },
            {
                suit: 'Heart',
                value: 5
            },
            {
                suit: 'Clubs',
                value: 9
            },
            {
                suit: 'Diamonds',
                value: 6
            },
            {
                suit: 'Spades',
                value: 7
            }
        ];
        const result = calculateHandRanking(cardsOnHand);
        expect(calculateHandRanking(cardsOnHand)).toBe('Pair');
    });
    
    it('Evaluate cards on hand is a Two Pair', () => {
        const cardsOnHand = [
            {
                suit: 'Spades',
                value: 5
            },
            {
                suit: 'Heart',
                value: 5
            },
            {
                suit: 'Clubs',
                value: 6
            },
            {
                suit: 'Diamonds',
                value: 6
            },
            {
                suit: 'Spades',
                value: 7
            }
        ];
        const result = calculateHandRanking(cardsOnHand);
        expect(calculateHandRanking(cardsOnHand)).toBe('Two Pair');
    });

    it('Evaluate cards on hand is a Three of a kind', () => {
        const cardsOnHand = [
            {
                suit: 'Spades',
                value: 1
            },
            {
                suit: 'Heart',
                value: 1
            },
            {
                suit: 'Clubs',
                value: 1
            },
            {
                suit: 'Diamonds',
                value: 6
            },
            {
                suit: 'Spades',
                value: 5
            }
        ];
        const result = calculateHandRanking(cardsOnHand);
        expect(calculateHandRanking(cardsOnHand)).toBe('Three of a kind');
    });

    it('Evaluate cards on hand is a Four of a kind', () => {
        const cardsOnHand = [
            {
                suit: 'Spades',
                value: 1
            },
            {
                suit: 'Heart',
                value: 1
            },
            {
                suit: 'Clubs',
                value: 1
            },
            {
                suit: 'Diamonds',
                value: 1
            },
            {
                suit: 'Spades',
                value: 5
            }
        ];
        const result = calculateHandRanking(cardsOnHand);
        expect(calculateHandRanking(cardsOnHand)).toBe('Four of a kind');
    });

    it('Evaluate cards on hand is a Full House', () => {
        const cardsOnHand = [
            {
                suit: 'Spades',
                value: 1
            },
            {
                suit: 'Heart',
                value: 1
            },
            {
                suit: 'Clubs',
                value: 1
            },
            {
                suit: 'Diamonds',
                value: 5
            },
            {
                suit: 'Spades',
                value: 5
            }
        ];
        const result = calculateHandRanking(cardsOnHand);
        expect(calculateHandRanking(cardsOnHand)).toBe('Full House');
    });

    it('Evaluate cards on hand is a Flush', () => {
        const cardsOnHand = [
            {
                suit: 'Spades',
                value: 1
            },
            {
                suit: 'Spades',
                value: 7
            },
            {
                suit: 'Spades',
                value: 13
            },
            {
                suit: 'Spades',
                value: 3
            },
            {
                suit: 'Spades',
                value: 5
            }
        ];
        const result = calculateHandRanking(cardsOnHand);
        expect(calculateHandRanking(cardsOnHand)).toBe('Flush');
    });
});