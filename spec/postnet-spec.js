const postnet = require('../main/postnet');

describe('postnet', () => {
    describe('zipcode2Barcode', () => {
        it('should translate zipcode to barcode', () => {
            [
                {
                    zipcode: '45056-1234',
                    barcode: '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|'
                },
                {
                    zipcode: '450561234',
                    barcode: '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|'
                },
                {
                    zipcode: '45056',
                    barcode: '|:|::|:|:|:||::::|:|::||::||:::|'
                }
            ].forEach((example) => {
                const result = postnet.zipcode2Barcode(example.zipcode);
                expect(result.success).toBeTruthy();
                expect(result.value).toEqual(example.barcode);
            });
        });

        it('should return false when zipcode not valid', () => {
            ['456', '45056-123', '45010101001010'].forEach((barcode) => {
                const result = postnet.zipcode2Barcode(barcode);
                expect(result.success).toBeFalsy();
                expect(result.error).toBe('invalid_zipcode');
            });
        });
    });
    
    describe('barcode2Zipcode', () => {
        it('should translate barcode to zipcode', () => {
            [
                {
                    zipcode: '45056-1234',
                    barcode: '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|'
                },
                {
                    zipcode: '45056-1234',
                    barcode: '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|'
                },
                {
                    zipcode: '45056',
                    barcode: '|:|::|:|:|:||::::|:|::||::||:::|'
                }
            ].forEach((example) => {
                const result = postnet.barcode2Zipcode(example.barcode);
                expect(result.success).toBeTruthy();
                expect(result.value).toEqual(example.zipcode);
            });
        });

        it('should validate barcode format', () => {
            [':|::|:|:|:||::::|:|::||::||:::'].forEach((barcode) => {
                const result = postnet.barcode2Zipcode(barcode);
                expect(result.success).toBeFalsy();
                expect(result.error).toBe('invalid_barcode');
            });
        });

        it('should validate zipcode by check digit', () => {
            const result = postnet.barcode2Zipcode('|:|::|:|:|:||::::|:|::||:::::|||');
            expect(result.success).toBeFalsy();
            expect(result.error).toBe('check_digit_not_match');
        });
    });
});
