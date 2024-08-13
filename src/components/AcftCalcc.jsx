import React, { useState, useEffect } from "react";
import testScore from "./testScore.json";
import { getAgeGroup, calculateDeadliftScore, calculatePowerThrowScore, calculatePushUpsScore, calculateRunScore, calculatePlankScore, calculateSprintDragCarryScore  } from "../utils/Helper";

const AcftCalcc = () => {
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(17);
  const [ageDisplay, setAgeDisplay] = useState("17");
  const [deadlift, setDeadlift] = useState(60);
  const [powerThrow, setPowerThrow] = useState(3.3);
  const [pushUps, setPushUps] = useState(0);
  const [sprintDragCarry, setSprintDragCarry] = useState({ minutes: 4, seconds: 48 });
  const [plank, setPlank] = useState({ minutes: 0, seconds: 48 });
  const [run, setRun] = useState({ minutes: 27, seconds: 0 });
  const [totalScore, setTotalScore] = useState(0);
  const [meetsExemptionCriteria, setMeetsExemptionCriteria] = useState(false);
  const [meetsMinimumStandard, setMeetsMinimumStandard] = useState(false);

  const deadliftScore = calculateDeadliftScore(gender, age, deadlift, testScore);
  const powerThrowScore = calculatePowerThrowScore(gender, age, powerThrow, testScore);
  const pushUpsScore = calculatePushUpsScore(gender, age, pushUps, testScore);
  const runScore = calculateRunScore(gender, age, run, testScore);
  const sprintDragCarryScore = calculateSprintDragCarryScore(gender, age, sprintDragCarry, testScore);
  const plankScore = calculatePlankScore(gender, age, plank, testScore);

  const calculateTotalScore = () => {
    const total = deadliftScore + powerThrowScore + pushUpsScore + sprintDragCarryScore + plankScore + runScore;
    const meetsMinimumStandard = deadliftScore >= 60 && powerThrowScore >= 60 && pushUpsScore >= 60 && sprintDragCarryScore >= 60 && plankScore >= 60 && runScore >= 60;
    const meetsExemptionCriteria = total >= 540 && deadliftScore >= 80 && powerThrowScore >= 80 && pushUpsScore >= 80 && sprintDragCarryScore >= 80 && plankScore >= 80 && runScore >= 80;
    return { total, meetsMinimumStandard, meetsExemptionCriteria };
  };

  const handleAgeChange = (value) => {
    if (value === "" || value < 0) {
      setAge(0);
      setAgeDisplay("0");
    } else {
      setAge(Number(value));
      setAgeDisplay(value);
    }
  };

  useEffect(() => {
    setAgeDisplay(String(age));
  }, [age]);
  

  useEffect(() => {
    const { total, meetsMinimumStandard, meetsExemptionCriteria } = calculateTotalScore();
    setTotalScore(total);
    setMeetsMinimumStandard(meetsMinimumStandard);
    setMeetsExemptionCriteria(meetsExemptionCriteria);
  }, [gender, age, deadlift, powerThrow, pushUps, sprintDragCarry, plank, run]);
  
  const handleNegativeCheck = (value, minValue) => {
    return value < minValue ? minValue : value;
  };
  const handleSliderChange = (e) => {
    const totalSeconds = 27 * 60 - Number(e.target.value);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    setRun({ minutes, seconds });
  };

  return (
    <div className="min-h-screen bg-white p-0.5 flex flex-col justify-center items-center overflow-hidden">
      <h2 className="text-xs font-bold mb-0.5 text-center">ACFT Score Calculator</h2>
  
      <div className="bg-white p-1.5 rounded-lg w-full max-w-xs">
        <div className="mb-0.5">
          <label htmlFor="gender" className="block font-medium text-xs">Gender</label>
          <select
            id="gender"
            className="w-full p-0.5 border rounded text-xs"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">-Select Gender-</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
  
        <div className="mb-0.5">
          <label htmlFor="age" className="block font-medium text-xs">Age</label>
          <input
            id="age"
            type="number"
            className="w-full p-0.5 border rounded text-xs"
            value={ageDisplay}
            onChange={(e) => handleAgeChange(e.target.value)}
            min="0"
          />
        </div>
  
        <div className="mb-0.5">
          <label htmlFor="deadlift" className="block font-medium text-xs">Maximum Deadlift (lbs.)</label>
          <input
            id="deadlift"
            type="range"
            className="w-full h-2"
            min="60"
            max="340"
            step="10"
            value={deadlift}
            onChange={(e) => setDeadlift(Number(e.target.value))}
          />
          <div className="flex justify-between items-center mt-0.5 text-xs">
            <input
              type="number"
              className="w-1/2 p-0.5 border rounded text-xs"
              value={deadlift}
              onChange={(e) => setDeadlift(handleNegativeCheck(Number(e.target.value), 60))}
              min="60"
              max="340"
            />
            <div className="ml-1 font-semibold text-xs">{deadliftScore} points</div>
          </div>
        </div>
  
        <div className="mb-0.5">
          <label htmlFor="powerThrow" className="block font-medium text-xs">Standing Power Throw (m)</label>
          <input
            id="powerThrow"
            type="range"
            className="w-full h-2"
            min="3.3"
            max="12.5"
            step="0.1"
            value={powerThrow}
            onChange={(e) => setPowerThrow(Number(e.target.value))}
          />
          <div className="flex justify-between items-center mt-0.5 text-xs">
            <input
              type="number"
              className="w-1/2 p-0.5 border rounded text-xs"
              value={powerThrow}
              onChange={(e) => setPowerThrow(handleNegativeCheck(Number(e.target.value), 3.3))}
              min="3.3"
              max="12.5"
            />
            <div className="ml-1 font-semibold text-xs">{powerThrowScore} points</div>
          </div>
        </div>
  
        <div className="mb-0.5">
          <label htmlFor="pushUps" className="block font-medium text-xs">Hand-Release Push-Ups (reps)</label>
          <input
            id="pushUps"
            type="range"
            className="w-full h-2"
            min="0"
            max="100"
            step="1"
            value={pushUps}
            onChange={(e) => setPushUps(Number(e.target.value))}
          />
          <div className="flex justify-between items-center mt-0.5 text-xs">
            <input
              type="number"
              className="w-1/2 p-0.5 border rounded text-xs"
              value={pushUps}
              onChange={(e) => setPushUps(handleNegativeCheck(Number(e.target.value), 0))}
              min="0"
              max="100"
            />
            <div className="ml-1 font-semibold text-xs">{pushUpsScore} points</div>
          </div>
        </div>
  
        <div className="mb-0.5">
          <label htmlFor="sprintDragCarry" className="block font-medium text-xs">Sprint Drag Carry (m:s)</label>
          <input
            id="sprintDragCarry"
            type="range"
            className="w-full h-2"
            min="0"
            max="201"
            step="1"
            value={4 * 60 + 48 - (sprintDragCarry.minutes * 60 + sprintDragCarry.seconds)}
            onChange={(e) => {
              const totalSeconds = Number(e.target.value);
              const newTotalSeconds = 4 * 60 + 48 - totalSeconds;
              const minutes = Math.floor(newTotalSeconds / 60);
              const seconds = newTotalSeconds % 60;
              setSprintDragCarry({ minutes, seconds });
            }}
          />
          <div className="flex justify-between mt-0.5 text-xs">
            <div className="flex">
              <input
                type="text"
                className="w-10 p-1 border rounded text-xs"
                value={sprintDragCarry.minutes}
                onChange={(e) => setSprintDragCarry({ ...sprintDragCarry, minutes: handleNegativeCheck(Number(e.target.value), 0) })}
                min="0"
                max="4"
              />
              <span>m</span>
            </div>
            <div className="flex">
              <input
                type="text"
                className="w-10 p-1 border rounded text-xs"
                value={sprintDragCarry.seconds}
                onChange={(e) => setSprintDragCarry({ ...sprintDragCarry, seconds: handleNegativeCheck(Number(e.target.value), 0) })}
                min="0"
                max="59"
              />
              <span>s</span>
            </div>
            <div className="font-semibold text-xs">{sprintDragCarryScore} points</div>
          </div>
        </div>
  
        <div className="mb-0.5">
          <label htmlFor="plank" className="block font-medium text-xs">Plank (m:s)</label>
          <input
            id="plank"
            type="range"
            className="w-full h-2"
            min="0"
            max="200"
            step="1"
            value={plank.minutes * 60 + plank.seconds}
            onChange={(e) => {
              const totalSeconds = Number(e.target.value);
              const minutes = Math.floor(totalSeconds / 60);
              const seconds = totalSeconds % 60;
              setPlank({ minutes, seconds });
            }}
          />
          <div className="flex justify-between mt-0.5 text-xs">
            <div className="flex">
              <input
                type="text"
                className="w-10 p-1 border rounded text-xs"
                value={plank.minutes}
                onChange={(e) => setPlank({ ...plank, minutes: handleNegativeCheck(Number(e.target.value), 0) })}
                min="0"
                max="3"
              />
              <span>m</span>
            </div>
            <div className="flex">
              <input
                type="text"
                className="w-10 p-1 border rounded text-xs"
                value={plank.seconds}
                onChange={(e) => setPlank({ ...plank, seconds: handleNegativeCheck(Number(e.target.value), 0) })}
                min="0"
                max={plank.minutes === 3 ? "40" : "59"}
              />
              <span>s</span>
            </div>
            <div className="font-semibold text-xs">{plankScore} points</div>
          </div>
        </div>
  
        <div className="mb-0.5">
          <label htmlFor="run" className="block font-medium text-xs">2 Mile Run (m:s)</label>
          <input
            id="run"
            type="range"
            className="w-full h-2"
            min="0"
            max={(27 * 60) - (13 * 60 + 22)}
            step="1"
            value={27 * 60 - (run.minutes * 60 + run.seconds)}
            onChange={handleSliderChange}
          />
          <div className="flex justify-between mt-0.5 text-xs">
            <div className="flex">
              <input
                type="text"
                className="w-10 p-1 border rounded text-xs"
                value={run.minutes}
                onChange={(e) => setRun({ ...run, minutes: handleNegativeCheck(Number(e.target.value), 13) })}
                min="13"
                max="27"
              />
              <span>m</span>
            </div>
            <div className="flex">
              <input
                type="text"
                className="w-10 p-1 border rounded text-xs"
                value={run.seconds}
                onChange={(e) => setRun({ ...run, seconds: handleNegativeCheck(Number(e.target.value), 0) })}
                min="0"
                max="59"
              />
              <span>s</span>
            </div>
            <div className="font-semibold text-xs">{runScore} points</div>
          </div>
        </div>
  
        <div className="font-bold mt-1 text-xs">Total Score: {totalScore}</div>
        <div className={`font-medium text-xs ${meetsMinimumStandard ? "text-green-500" : "text-red-500"}`}>
          Results: {meetsMinimumStandard ? "Meets Army minimum standard" : "Does not meet Army minimum standard"}
        </div>
        <div className="font-medium text-xs">
          {meetsExemptionCriteria ? "Exempt from body fat circumference-based tape assessment" : ""}
        </div>
      </div>
    </div>
  );
  
  
  
  
  
};

export default AcftCalcc;
