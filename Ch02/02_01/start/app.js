(function() {
  "use strict";

  function SizeSelector(props) {
    function sizeOptions() {
      let sizes = window.Inventory.allSizes;
      return sizes.map(function(num) {
        return (
          <option value={num} key={num}>
            {num}
          </option>
        ) 
      })
    }
    return (
      <div className="field-group">
        <label htmlFor="size-options">Available Size:</label>
        <select className="sizeOptions" id="size-options">
          { sizeOptions() }
        </select>
      </div>
    )
  }
  
  function ProductImage(props) {
    return <img src='../../../assets/red.jpg' alt='product-image' />
  }
  

  function ProductCustomizer(props) {
    return (
      <div className='customizer'>
        <div className='product-image'>
          <ProductImage />
        </div>
        <div className="selectors">	
          <SizeSelector />
        </div>	
      </div>
    ); 
  }

  ReactDOM.render(
    <ProductCustomizer />, document.getElementById('react-root')
  );
})();
