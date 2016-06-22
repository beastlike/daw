"use strict";

( function() {

var dist,
	samplesCopied = [];

gs.samplesCopy = function() {
	var min = Infinity,
		max = -Infinity;
	samplesCopied = gs.selectedSamples.map( function( s ) {
		min = Math.min( min, s.xem );
		max = Math.max( max, s.xem + s.wsample.duration * ui.BPMem );
		return s;
	} );
	if ( ui.isMagnetized ) {
		min = ui.xemFloor( min );
		max = ui.xemCeil( max );
	}
	dist = max - min;
};

gs.samplesPaste = function() {
	gs.samplesUnselect();
	samplesCopied.forEach( function( s ) {
		var ns = gs.sampleCreate( s.gsfile, s.track.id, s.xem + dist );
		ns.slip( s.wsample.offset );
		ns.duration( s.wsample.duration );
		gs.sampleSelect( ns, true );
	} );
	gs.samplesCopy();
};

} )();