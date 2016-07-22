const postnet = require('../main/postnet');

describe('postnet', () => {
    it('should translate zipcode to barcode', () => {
        const zipcode = '45056-1234';
        const result = postnet.zipcode2Barcode(zipcode);
        expect(result.success).toBe(true);
        expect(result.value).toEqual('|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|');
    });
    
    it('should return false when zipcode not valid', () => {
        let result = postnet.zipcode2Barcode('45-056-1234');
        expect(result.success).toBe(false);
        expect(result.error).toBe('invalid_zipcode');
        
        result = postnet.zipcode2Barcode('4505');
        expect(result.success).toBe(false);
        expect(result.error).toBe('invalid_zipcode');
    });
});
