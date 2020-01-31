(function() {
  "use strict";

  function SizeSelector(props) {
    function sizeOptions() {
      let sizes = window.Inventory.allSizes;
      return sizes.map(num => {
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
        <select defaultValue={props.size} className="sizeOptions" id="size-options">
          { sizeOptions() }
        </select>
      </div>
    )
  }
  
  function ProductImage(props) {
    return <img src={`../../../assets/${props.color}.jpg`} alt='product-image' />
  }
  

  function ProductCustomizer(props) {
    return (
      <div className='customizer'>
        <div className='product-image'>
          <ProductImage color="blue"/>
        </div>
        <div className="selectors">	
          <SizeSelector size={9.5} />
        </div>	
      </div>
    ); 
  }

  ReactDOM.render(
    <ProductCustomizer />, document.getElementById('react-root')
  );
})();
