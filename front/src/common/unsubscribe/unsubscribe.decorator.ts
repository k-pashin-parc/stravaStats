export function CommonUnsubscribe (constructor) {
	const original = constructor.prototype.ngOnDestroy;

	constructor.prototype.ngOnDestroy = function() {
    for (const prop in this) {

      if (prop) {
				const property = this[prop];

        if (property && (typeof property.unsubscribe === 'function')) {
          property.unsubscribe();
        }
      }
    }

    if (original && typeof original === 'function') {
      original.apply(this, arguments)
    };
  };
}
