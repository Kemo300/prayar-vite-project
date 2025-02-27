import { useEffect, useState } from "react";
import Prayer from "./component/prayer";

function App() {
  const [prayarTimes, setPrayarTimes] = useState({});
  const [dateTime, setDateTime] = useState("");
  const [city, setCity] = useState("Cairo");

  const cities = [
    { name: "القاهرة", value: "Cairo" },
    { name: "الاسكندرية", value: "Alexandria" },
    { name: "الجيزة", value: "Giza" },
    { name: "المنصورة", value: "Mansoura" },
    { name: "أسوان", value: "Aswan" },
    { name: "الأقصر", value: "Loxur" },
  ];

  useEffect(() => {
    const fetchPrayarTimes = async () => {
      try {
        const response = await fetch(
          `https://api.aladhan.com/v1/timingsByCity/27-02-2025?city=Eg&country=${city}`
        );
        const data_Prayar = await response.json();

        setPrayarTimes(data_Prayar.data.timings);
        setDateTime(data_Prayar.data.date.gregorian.date);

        console.log(data_Prayar.data.date.gregorian.date);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPrayarTimes();
  }, [city]);

  const formatTimes = (time) => {
    if (!time) {
      return "00:00";
    }

    let [hours, minutes] = time.split(":").map(Number);
    const perd = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes < 10 ? "0" + minutes : minutes}  ${perd}`;
  };

  return (
    <section>
      <div className="container">
        <div className="top-section">
          <div className="city">
            <h3>المدينة</h3>

            <select name="" id="" onChange={(e) => setCity(e.target.value)}>
              {cities.map((city_Obj) => (
                <option key={city_Obj.value} value={city_Obj.value}>
                  {city_Obj.name}
                </option>
              ))}
            </select>
          </div>
          <div className="date">
            <h3>التاريخ</h3>
            <h4>{dateTime}</h4>
          </div>
        </div>

        <Prayer name="الفجر" time={formatTimes(prayarTimes.Fajr)} />
        <Prayer name="الظهر" time={formatTimes(prayarTimes.Dhuhr)} />
        <Prayer name="العصر" time={formatTimes(prayarTimes.Asr)} />
        <Prayer name="المغرب" time={formatTimes(prayarTimes.Maghrib)} />
        <Prayer name="العشاء" time={formatTimes(prayarTimes.Isha)} />
      </div>
    </section>
  );
}

export default App;
