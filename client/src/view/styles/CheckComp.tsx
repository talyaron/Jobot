import './buttons.scss'

const CheckComp = ({}: {
  // title, company, location, logo, type
  // title: string;
  // company: string;
  // location: string;
  // logo: string;
  // type: "Full-Time" | "Part-Time";
}) => {
  return (
    <div className="card">
      <button className='btn smallBtn'>הגשת מועמדות </button>
      <button className='btn bigBtn'>חפש משרות </button>
      <button className='btn roundedBtn'>התחברות </button>


      {/* <img src={logo} alt={company} className="logo" />
      <div className="info">
        <span className="title">{title}</span>
        <span className="company">{company}</span>
        <span className="location">
          📍 {location}
        </span>
      </div>
      <span
        className={`ml-auto text-xs font-bold px-3 py-1 rounded-lg ${
          type === "Full-Time" ? "bg-blue-100 text-blue-600" : "bg-pink-100 text-pink-600"
        }`}
      >
        {type}
      </span> */}
    </div>
  );
};




export default CheckComp
