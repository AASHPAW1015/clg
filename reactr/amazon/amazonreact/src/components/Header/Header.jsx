import './header.css'
import HeaderLowerPart from './HeaderLowerPart/HeaderLowerPart';
import HeaderUpperPart from './HeaderUpperPart/HeaderUpperPart';

const Header = () => {
  return (
    <>
      <div className="headerMainContainer mainContainer">
        <HeaderUpperPart />
        <HeaderLowerPart />
        
      </div>
    </>
  );
};

export default Header;
