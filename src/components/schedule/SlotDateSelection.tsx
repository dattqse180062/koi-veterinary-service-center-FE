import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import '../../styles/Schedule.css';
import Sidebar from "../layout/Sidebar";
import { useSelector, useDispatch } from "react-redux"; // Import useDispatch
import { setSlot } from '../../store/actions'; // Import the setSlot action

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
    const dispatch = useDispatch(); // Initialize useDispatch
    const navigate = useNavigate(); // Initialize useNavigate
    const doctor = useSelector((state: any) => state.doctor);

    const currentYear = new Date().getUTCFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const currentWeekStart = getCurrentWeekStart();
    const { weeks } = generateWeeksOfYear(selectedYear);
    const [selectedWeekStart, setSelectedWeekStart] = useState(currentWeekStart.toISOString().split('T')[0]);
    const [weekDates, setWeekDates] = useState<string[]>(getWeekDates(currentWeekStart));

    const [appointments, setAppointments] = useState<any[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<{ year: number; month: number; day: number; slot_order: number; slot_id: number } | null>(null); // New state for selected slot
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];



    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/slots/${doctor.user_id}`)
            .then((response) => {
                setAppointments(response.data);
            })
            .catch((error) => {
                console.error('Error fetching slots:', error);
            });
    }, [doctor.user_id, selectedWeekStart]);

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

    const handleSlotSelection = (year: number, month: number, day: number, slot_order: number, slot_id:number) => {
        const selectedDate = new Date(year, month - 1, day); // Create a Date object for the selected date
        const today = new Date(); // Get today's date

        // Adjust for Vietnam timezone (UTC+7)
        const vietnamOffset = 7 * 60 * 60 * 1000; // 7 hours in milliseconds
        const localToday = new Date(today.getTime() + vietnamOffset); // Today's date in local time

        // Reset the time part to ensure the comparison is only based on the date
        localToday.setHours(0, 0, 0, 0);
        selectedDate.setHours(0, 0, 0, 0);

        // Only allow selection if the slot is available and the date is today or in the future
        const appointment = appointments.find(appointment => (
            appointment.year === year &&
            appointment.month === month &&
            appointment.day === day &&
            appointment.slot_order === slot_order
        ));

        if (selectedDate >= localToday && !appointment) {
            setSelectedSlot({ year, month, day, slot_order, slot_id }); // Set the selected slot
        }
    };

    const handleNextClick = () => {
        if (selectedSlot) {
            dispatch(setSlot(selectedSlot)); // Dispatch the selected slot to Redux
            navigate('/appointment/fill-information'); // Navigate to the next page (replace with your actual path)
        }
    };

    const workingSlots = new Set<number>();
    appointments.forEach(appointment => {
        if (appointment.slot_order === 1 || appointment.slot_order === 3) {
            workingSlots.add(1);
            workingSlots.add(3);
        } else if (appointment.slot_order === 2 || appointment.slot_order === 4) {
            workingSlots.add(2);
            workingSlots.add(4);
        }
    });

    const handleBackClick = () => {
        navigate('/appointment/vet-selection'); // Navigate back to service selection page
    };

    return (
        <div className="d-flex flex-grow-1 align-items-center">
            <div className="container-fluid">
                <button
                    className="btn btn-secondary mb-3"
                    style={{position: 'absolute', top: '12%', left: '3%'}}
                    onClick={handleBackClick}>
                    Back
                </button>

                <div className="row justify-content-center">
                    {/* Card Component */}
                    <div className="col-md-3 mb-4 d-flex justify-content-center align-items-center">
                        <div className="card shadow"
                             style={{borderRadius: '40px', width: '300px', height: '330px'}}>
                            <img
                                src={doctor.avatar}
                                className="card-img-top rounded-circle mx-auto mt-4"
                                alt={`${doctor.first_name} ${doctor.last_name}`}
                                style={{width: '200px', height: '200px'}}
                            />
                            <div className="card-body text-center">
                                <h5 className="card-title text-center font-weight-bold"
                                    style={{
                                        textAlign: "center",
                                        width: "100%"
                                    }}>{`${doctor.first_name} ${doctor.last_name}`}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <h3 className="text-start" style={{fontWeight: "bold", color: "#02033B", fontSize: "2.5rem"}}>
                            Doctor Schedule
                        </h3>

                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <div className="d-flex align-items-center">
                                <select id="week-select" className="form-select form-select-sm"
                                        value={selectedWeekStart} onChange={handleWeekChange}>
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
                                        <br/> {weekDates[index].split('-').reverse().join('/')}
                                    </th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {[1, 2, 3, 4].map((slotId) => (
                                <tr key={slotId}>
                                    <td>{`Slot ${slotId}`}</td>
                                    {weekDates.map((date, dateIndex) => {
                                        const appointment = appointments.find(appointment => (
                                            appointment.year === new Date(date).getUTCFullYear() &&
                                            appointment.month === new Date(date).getUTCMonth() + 1 &&
                                            appointment.day === new Date(date).getUTCDate() &&
                                            appointment.slot_order === slotId
                                        ));


                                        const isWorkingSlot = workingSlots.has(slotId);
                                        const isSelectedSlot = selectedSlot?.slot_order === slotId &&
                                            selectedSlot?.year === new Date(date).getUTCFullYear() &&
                                            selectedSlot?.month === new Date(date).getUTCMonth() + 1 &&
                                            selectedSlot?.day === new Date(date).getUTCDate();

                                        const currentDate = new Date(); // Get current date
                                        const cellDate = new Date(date);
                                        const isPastDate = (cellDate: Date) => {
                                            const today = new Date();
                                            const vietnamOffset = 7 * 60 * 60 * 1000; // 7 hours in milliseconds
                                            const localToday = new Date(today.getTime() + vietnamOffset); // Today's date in local time
                                            localToday.setHours(0, 0, 0, 0); // Reset time part

                                            return cellDate < localToday; // Compare adjusted date
                                        };

                                        return (
                                            <td key={dateIndex}
                                                className={`${isWorkingSlot ? (isSelectedSlot ? 'selected' : 'notSelected') : 'inactive'} ${appointment ? 'booked' : ''} ${isPastDate(cellDate) ? 'past-date' : ''}`} // Add past-date class
                                                onClick={() => isWorkingSlot && handleSlotSelection(new Date(date).getUTCFullYear(), new Date(date).getUTCMonth() + 1, new Date(date).getUTCDate(), slotId, 0)}
                                                style={{backgroundColor: isPastDate(cellDate) ? '#ccd1d1' : ''}} // Change color for past dates
                                            >
                                                {isWorkingSlot ? (
                                                    isPastDate(cellDate) ? ( // Kiểm tra nếu đây là ngày trong quá khứ
                                                        <p className="fw-bold  ">-</p> // Hiển thị dấu "-" nếu là ngày trong quá khứ
                                                    ) : (
                                                        appointment ? (
                                                            <>
                                                                <p className="fw-bold text-warning">BOOKED</p>
                                                                <p>{slotOrderToTime[slotId as keyof typeof slotOrderToTime]}</p>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <p className="text-success fw-bold">AVAILABLE</p>
                                                                <p>{slotOrderToTime[slotId as keyof typeof slotOrderToTime]}</p>
                                                            </>
                                                        )
                                                    )
                                                ) : (
                                                    <p className="fw-bold">-</p>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <button className="btn btn-primary mt-3" onClick={handleNextClick} disabled={!selectedSlot}>
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default DoctorSchedule;
