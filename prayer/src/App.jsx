import { useEffect, useState } from "react"
import Prayer from "./component/Prayer"

function App() {

  const [prayerTimes , setPrayerTimes] = useState({})
  const [dateTime , setDateTime] = useState("")
  const [city , setCity] = useState("Jeddah")
  

  const cities =[
    {name : "جدة" , value: "Jeddah"},
    {name : "الرياض" , value: "Riyadh"},
    {name : "بريدة" , value: "Buraydah"},
    {name : "تبوك" , value: "Tabuk"},
    {name : "ابها" , value: "Abha"},
    {name : "الدمام" , value: "Dammam"},
    {name : "مكة" , value: "Mecca"},
    {name : "المدينة" , value: "Medina"},
    {name : "الطائف" , value: "Taif"},
    {name : "نجران" , value: "Najran"},
  ]

  

  useEffect(() => {

    const fetchPrayerTimes = async () => {
      try{
            const response = await fetch(`https://api.aladhan.com/v1/timingsByAddress/23-01-2025?address=${city}`)
            const data_Prayar = await response.json()

            setPrayerTimes(data_Prayar.data.timings)
            setDateTime(data_Prayar.data.date.gregorian.date)
      } catch(error){
        console.error(error)
      }
    }

    fetchPrayerTimes()

  },[city])


  const formatTimes = (time) => {
    if(!time){
      return "00:00";
    }

    let [hours , minutes] = time.split(":").map(Number)
    const perd = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    return `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${perd}`
  }
  

  return (
    <section>
      <div className="container">

        <div className="top_sec">
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

        <Prayer name="الفجر" time={formatTimes(prayerTimes.Fajr)}/>
        <Prayer name="الظهر" time={formatTimes(prayerTimes.Dhuhr)}/>
        <Prayer name="العصر" time={formatTimes(prayerTimes.Asr)}/>
        <Prayer name="المغرب" time={formatTimes(prayerTimes.Maghrib)}/>
        <Prayer name="العشاء" time={formatTimes(prayerTimes.Isha)}/>
      </div>
    </section>
  )
}

export default App
