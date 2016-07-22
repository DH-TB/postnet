const postnet = require('../main/postnet');

describe('postnet', () => {
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
            expect(result.success).toBe(true);
            expect(result.value).toEqual(example.barcode);
        });
    });
    
    it('should return false when zipcode not valid', () => {
        ['456', '45056-123', '45010101001010'].forEach((barcode) => {
            let result = postnet.zipcode2Barcode(barcode);
            expect(result.success).toBe(false);
            expect(result.error).toBe('invalid_zipcode');
        });
    });
});
