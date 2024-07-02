import React from "react";
interface WeatherCardProps {
  city: string;
  temperature: number;
  description: string;
  icon: string;
  date: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  city,
  temperature,
  description,
  icon,
  date,
}) => {
  const roundedTemperature = (temperature - 273.15).toFixed(0);
  return (
    <div className=" min-w-[220px] lg:w-2/5 xl:w-3/12 rounded-lg overflow-hidden text-blue-500 shadow-lg bg-gradient-to-r from-yellow-50 to-yellow-300 p-2 relative min-h-[220px]">
      <div className="flex justify-between">
        <div className="flex flex-col justify-center gap-1">
          <h2 className="text-4xl font-medium">{roundedTemperature}°C</h2>
          <p className="text-">
            {description.charAt(0).toUpperCase() + description.slice(1)}
          </p>
        </div>
        <div>
          <img
            src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={description}
            className="w-24 h-24"
          />
        </div>
      </div>
      <div className="text-center ">
        <h5 className="font-medium text-xl">{city}</h5>
        <h5 className="font-medium text-xl">{date}</h5>
      </div>
    </div>
  );
};

export default WeatherCard;
