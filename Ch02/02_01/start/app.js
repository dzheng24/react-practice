(function() {
  "use strict";

  function SizeSelector(props) {
    function sizeOptions() {
      return props.sizes.map(num => {
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
    const [size, setSize] = React.useState(9.5);
    const [sizes, setSizes] = React.useState(window.Inventory.allSizes);
    const [color, setColor] = React.useState("blue");

    return (
      <div className='customizer'>
        <div className='product-image'>
          <ProductImage color={color}/>
        </div>
        <div className="selectors">	
          <SizeSelector size={size} sizes={sizes} />
        </div>	
      </div>
    ); 
  }

  ReactDOM.render(
    <ProductCustomizer />, document.getElementById('react-root')
  );
})();
