import HeaderUpperPartMenu from '../../HeaderUpperPartMenu/HeaderUpperPartMenu'
import InputField from '../../InputField/InputField'
import Logo from '../../Logo/Logo'
import './headerUpperPart.css'
const HeaderUpperPart = () => {

  var inputValue

  return (
    <>
    <div className='headerUpperPartMainContainer mainContainer'>
      <Logo />
      <HeaderUpperPartMenu upperText ="Delivering to Gurgaon 122001" lowerText="Update Address" />
      <InputField input_type="text" input_id ="headerSearchBox" input_name="searchBox" input_value={inputValue} input_onchange={(e)=>{
        inputValue = e.target.value
        console.log(e.target.value);
        
        
      }} />
      <button  >Show Vlaue</button>
    </div>
    </>
  )
}

export default HeaderUpperPart
