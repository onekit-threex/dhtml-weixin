//import encoding from './core/encoding/encoding.js'
//module.exports = encoding.TextDecoder
class TextDecoder{
    decode(array){
  
		let s = '';

		for ( let i = 0, il = array.length; i < il; i ++ ) {

			// Implicitly assumes little-endian.
			s += String.fromCharCode( array[ i ] );

		}

		try {

			// merges multi-byte utf-8 characters.

			return decodeURIComponent( escape( s ) );

		} catch ( e ) { // see #16358

			return s;

		}
    }
}
module.exports = TextDecoder