import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Progress, Alert } from 'reactstrap';
import { getSeats, loadSeatsRequest, getRequests, loadSeats } from '../../../redux/seatsRedux';
import io from 'socket.io-client';
import './SeatChooser.scss';

const totalSeats = 50;

const SeatChooser = ({ chosenDay, chosenSeat, updateSeat }) => {
  const dispatch = useDispatch();
  const seats = useSelector(getSeats);
  const requests = useSelector(getRequests);

  useEffect(() => {
    const socket = io('localhost:' + (process.env.PORT || '8000'));
    dispatch(loadSeatsRequest());
    socket.on('seatsUpdated', seats => dispatch(loadSeats(seats)));
  }, [dispatch])

  const isTaken = (seatId) => {
    return (seats.some(item => (item.seat === seatId && item.day === chosenDay)));
  }

  const seatsPerDay = seats.filter(item => (item.day === chosenDay))

  const prepareSeat = (seatId) => {
    if (seatId === chosenSeat) return <Button key={seatId} className="seats__seat" color="primary">{seatId}</Button>;
    else if (isTaken(seatId)) return <Button key={seatId} className="seats__seat" disabled color="secondary">{seatId}</Button>;
    else return <Button key={seatId} color="primary" className="seats__seat" outline onClick={(e) => updateSeat(e, seatId)}>{seatId}</Button>;
  }

  return (
    <div>
      <h3>Pick a seat</h3>
      <small id="pickHelp" className="form-text text-muted ml-2"><Button color="secondary" /> – seat is already taken</small>
      <small id="pickHelpTwo" className="form-text text-muted ml-2 mb-4"><Button outline color="primary" /> – it's empty</small>
      {(requests['LOAD_SEATS'] && requests['LOAD_SEATS'].success) && <div className="seats">{[...Array(totalSeats)].map((x, i) => prepareSeat(i + 1))}</div>}
      {(requests['LOAD_SEATS'] && requests['LOAD_SEATS'].pending) && <Progress animated color="primary" value={totalSeats} />}
      {(requests['LOAD_SEATS'] && requests['LOAD_SEATS'].error) && <Alert color="warning">Couldn't load seats...</Alert>}
      <h4>Free seats: {totalSeats - seatsPerDay.length}/{totalSeats}</h4>
    </div>
  )
}

export default SeatChooser;