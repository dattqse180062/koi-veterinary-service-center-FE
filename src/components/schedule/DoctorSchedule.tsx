import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../../styles/Schedule.css';
import Sidebar from "../layout/Sidebar"; // Import your custom CSS

const doctor = {
    id: 'D123',
    name: 'Dr. Emily Clark',
};

// Mock time slots data structured with year, month, day, slot_order, and status
const mockAppointments = [
    // Week 1 (September 23 - September 29, 2024)
    {
        time_slot: { slot_id: 1, year: 2024, month: 9, day: 23, slot_order: 1 },
        status: 'BOOKED',
    },
    {
        time_slot: { slot_id: 2, year: 2024, month: 9, day: 23, slot_order: 2 },
        status: 'AVAILABLE',
    },
    {
        time_slot: { slot_id: 3, year: 2024, month: 9, day: 24, slot_order: 1 },
        status: 'BOOKED',
    },
    {
        time_slot: { slot_id: 4, year: 2024, month: 9, day: 24, slot_order: 2 },
        status: 'AVAILABLE',
    },
    {
        time_slot: { slot_id: 5, year: 2024, month: 9, day: 25, slot_order: 3 },
        status: 'BOOKED',
    },
    {
        time_slot: { slot_id: 6, year: 2024, month: 9, day: 26, slot_order: 1 },
        status: 'AVAILABLE',
    },
    {
        time_slot: { slot_id: 7, year: 2024, month: 9, day: 27, slot_order: 2 },
        status: 'BOOKED',
    },
    {
        time_slot: { slot_id: 8, year: 2024, month: 9, day: 28, slot_order: 3 },
        status: 'AVAILABLE',
    },
    {
        time_slot: { slot_id: 9, year: 2024, month: 9, day: 29, slot_order: 4 },
        status: 'BOOKED',
    },

    // Week 2 (September 30 - October 6, 2024)
    {
        time_slot: { slot_id: 10, year: 2024, month: 9, day: 30, slot_order: 1 },
        status: 'AVAILABLE',
    },
    {
        time_slot: { slot_id: 11, year: 2024, month: 10, day: 1, slot_order: 2 },
        status: 'BOOKED',
    },
    {
        time_slot: { slot_id: 12, year: 2024, month: 10, day: 2, slot_order: 3 },
        status: 'AVAILABLE',
    },
    {
        time_slot: { slot_id: 13, year: 2024, month: 10, day: 3, slot_order: 1 },
        status: 'BOOKED',
    },
    {
        time_slot: { slot_id: 14, year: 2024, month: 10, day: 4, slot_order: 2 },
        status: 'AVAILABLE',
    },
    {
        time_slot: { slot_id: 15, year: 2024, month: 10, day: 5, slot_order: 3 },
        status: 'BOOKED',
    },
    {
        time_slot: { slot_id: 16, year: 2024, month: 10, day: 6, slot_order: 4 },
        status: 'AVAILABLE',
    },

    // Week 3 (October 7 - October 13, 2024)
    {
        time_slot: { slot_id: 17, year: 2024, month: 10, day: 7, slot_order: 1 },
        status: 'BOOKED',
    },
    {
        time_slot: { slot_id: 18, year: 2024, month: 10, day: 8, slot_order: 2 },
        status: 'AVAILABLE',
    },
    {
        time_slot: { slot_id: 19, year: 2024, month: 10, day: 9, slot_order: 3 },
        status: 'BOOKED',
    },
    {
        time_slot: { slot_id: 20, year: 2024, month: 10, day: 10, slot_order: 4 },
        status: 'AVAILABLE',
    },
    {
        time_slot: { slot_id: 21, year: 2024, month: 10, day: 11, slot_order: 1 },
        status: 'BOOKED',
    },
    {
        time_slot: { slot_id: 22, year: 2024, month: 10, day: 12, slot_order: 2 },
        status: 'AVAILABLE',
    },
    {
        time_slot: { slot_id: 23, year: 2024, month: 10, day: 13, slot_order: 3 },
        status: 'BOOKED',
    },

    // Week 4 (October 14 - October 20, 2024)
    {
        time_slot: { slot_id: 24, year: 2024, month: 10, day: 14, slot_order: 1 },
        status: 'AVAILABLE',
    },
    {
        time_slot: { slot_id: 25, year: 2024, month: 10, day: 15, slot_order: 2 },
        status: 'BOOKED',
    },
    {
        time_slot: { slot_id: 26, year: 2024, month: 10, day: 16, slot_order: 3 },
        status: 'AVAILABLE',
    },
    {
        time_slot: { slot_id: 27, year: 2024, month: 10, day: 17, slot_order: 4 },
        status: 'BOOKED',
    },
    {
        time_slot: { slot_id: 28, year: 2024, month: 10, day: 18, slot_order: 1 },
        status: 'AVAILABLE',
    },
    {
        time_slot: { slot_id: 29, year: 2024, month: 10, day: 19, slot_order: 2 },
        status: 'BOOKED',
    },
    {
        time_slot: { slot_id: 30, year: 2024, month: 10, day: 20, slot_order: 3 },
        status: 'AVAILABLE',
    },

    // Add more weeks as needed...
];


// Map slot_order to time ranges
const slotOrderToTime = {
    1: '7:30 - 9:30',
    2: '10:00 - 12:00',
    3: '13:00 - 15:00',
    4: '15:30 - 17:30',
};

// Get week dates function remains the same
const getWeekDates = (startDate: Date): string[] => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate() + i));
        dates.push(date.toISOString().split('T')[0]); // Format: YYYY-MM-DD
    }
    return dates;
};

// Get the start of the current week
const getCurrentWeekStart = (): Date => {
    const today = new Date();
    const currentDay = today.getUTCDay();
    const daysToMonday = currentDay === 0 ? -6 : 1 - currentDay;
    return new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() + daysToMonday));
};

// Generate weeks of the year based on selected year
const generateWeeksOfYear = (selectedYear: number) => {
    const currentDate = new Date(Date.UTC(selectedYear, 0, 1));
    const currentWeekStart = new Date(currentDate);
    const currentDay = currentDate.getUTCDay();
    const daysToMonday = currentDay === 0 ? -6 : 1 - currentDay;
    currentWeekStart.setUTCDate(currentDate.getUTCDate() + daysToMonday);

    const weeks = [];
    for (let i = 0; i < 52; i++) {
        const weekStart = new Date(currentWeekStart);
        weekStart.setUTCDate(currentWeekStart.getUTCDate() + i * 7);

        const weekEnd = new Date(weekStart);
        weekEnd.setUTCDate(weekStart.getUTCDate() + 6);

        const weekRange = `${weekStart.getUTCDate().toString().padStart(2, '0')}/${(weekStart.getUTCMonth() + 1).toString().padStart(2, '0')} to ${weekEnd.getUTCDate().toString().padStart(2, '0')}/${(weekEnd.getUTCMonth() + 1).toString().padStart(2, '0')}`;
        weeks.push({ weekStart: weekStart.toISOString().split('T')[0], weekRange });
    }

    const currentWeek = getWeekDates(currentWeekStart);
    return { weeks, currentWeek };
};

const DoctorSchedule: React.FC = () => {
    const location = useLocation();
    const { userId, fullName } = location.state; //


    const currentYear = new Date().getUTCFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const currentWeekStart = getCurrentWeekStart();
    const { weeks } = generateWeeksOfYear(selectedYear);
    const [selectedWeekStart, setSelectedWeekStart] = useState(currentWeekStart.toISOString().split('T')[0]);
    const [weekDates, setWeekDates] = useState<string[]>(getWeekDates(currentWeekStart));
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const handleWeekChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newWeekStart = event.target.value;
        setSelectedWeekStart(newWeekStart);
        setWeekDates(getWeekDates(new Date(newWeekStart)));
    };

    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newYear = parseInt(event.target.value, 10);
        setSelectedYear(newYear);
        const { weeks, currentWeek } = generateWeeksOfYear(newYear);
        setSelectedWeekStart(currentWeek[0]);
        setWeekDates(getWeekDates(new Date(currentWeek[0])));
    };

    const changeWeek = (direction: number) => {
        const currentStartDate = new Date(selectedWeekStart);
        currentStartDate.setUTCDate(currentStartDate.getUTCDate() + direction * 7);
        const newWeekStart = currentStartDate.toISOString().split('T')[0];
        setSelectedWeekStart(newWeekStart);
        setWeekDates(getWeekDates(currentStartDate));
    };

    return (
        <div className="d-flex flex-grow-1">
            <Sidebar />
            <div className="container" style={{ marginTop: "6rem" }}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 className="text-start" style={{fontWeight:"bold", color:"#02033B", fontSize:"2rem"}}>
                        Doctor Schedule
                    </h3>
                    <h3 className="text-end fst-italic" >
                        {`${fullName} (ID: ${userId})`}
                    </h3>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex align-items-center">
                        <select id="year-select" className="form-select form-select-sm me-2" value={selectedYear} onChange={handleYearChange}>
                            {[currentYear - 1, currentYear, currentYear + 1].map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                        <select id="week-select" className="form-select form-select-sm" value={selectedWeekStart} onChange={handleWeekChange}>
                            {weeks.map((week, index) => (
                                <option key={index} value={week.weekStart}>
                                    {week.weekRange}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <button className="btn btn-warning btn-sm me-2" onClick={() => changeWeek(-1)}>
                            &#8592;
                        </button>
                        <button className="btn btn-warning btn-sm" onClick={() => changeWeek(1)}>
                            &#8594;
                        </button>
                    </div>
                </div>
                <table className="table table-bordered table-small table-striped">
                    <thead>
                    <tr>
                        <th className="fs-5">Slot</th>
                        {weekDays.map((day, index) => (
                            <th key={index} className="text-center">
                                {day}
                                <br /> {weekDates[index].split('-').reverse().join('/')}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {[1, 2, 3, 4].map((slotId) => (
                        <tr key={slotId}>
                            <td>{`Slot ${slotId}`}</td>
                            {weekDates.map((date, dateIndex) => {
                                const appointment = mockAppointments.find(appointment => (
                                    appointment.time_slot.year === new Date(date).getUTCFullYear() &&
                                    appointment.time_slot.month === new Date(date).getUTCMonth() + 1 &&
                                    appointment.time_slot.day === new Date(date).getUTCDate() &&
                                    appointment.time_slot.slot_order === slotId
                                ));
                                return (
                                    <td key={dateIndex}>
                                        {appointment ? (
                                            <>
                                                <p className={`text-${appointment.status === 'AVAILABLE' ? 'success' : 'warning'} fw-bold` } >
                                                    {appointment.status}
                                                </p>
                                                <p>{slotOrderToTime[slotId as keyof typeof slotOrderToTime]}</p>
                                            </>
                                        ) : (
                                            <p>-</p>
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DoctorSchedule;
