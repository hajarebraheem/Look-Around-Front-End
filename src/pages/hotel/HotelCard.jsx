import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CallMade from '@material-ui/icons/CallMade';
import { useHistory } from "react-router-dom"
import { Row, Column, Item } from '@mui-treasury/components/flex';
import { useSizedIconButtonStyles } from '@mui-treasury/styles/iconButton/sized';
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';
import { useGradientBtnStyles } from '@mui-treasury/styles/button/gradient';
import { usePushingGutterStyles } from '@mui-treasury/styles/gutter/pushing';


const useCardHeaderStyles = makeStyles(() => ({
  root: { paddingBottom: 0 },
  title: {
    fontSize: '1.25rem',
    color: '#122740',
    display: "filex"
  },
  subheader: {
    fontSize: '0.875rem',
    color: '#495869',
  },
}));

// const CardHeader = props => {
//   const styles = useCardHeaderStyles();
//   console.log(props);
//   return (
//   );
// };
// backdrop-filter: blur(10px);
//     box-shadow: 10px 0 15px rgba(0,0,10,10);

const useStyles = makeStyles(() => ({
  card: {
    width: '700px',
    border: '2px solid',
    borderColor: '#E7EDF3',
    borderRadius: 16,
    transition: '0.5s',
    backdropFilter: "blur(10px)",
    boxShadow: "10px 0 -12px rgba(0,0,10,10)",
    '&:hover': {
      borderColor: '#5B9FED',
    },
  },
}));



export const HotelCard = React.memo(function HotelCard(props) {
  const history = useHistory()
  const styles = useStyles();
  const gap = { xs: 1, sm: 1.5, lg: 2 }

  const goCheckout = () => {

    props.setCheckoutHotel(props.hotel)
    props.setCheckoutRoom(props.room)
    history.push(`/hotelinfo`, { state: { room: props.room, hotel: props.hotel } })
  }
  const stylesbtn = useGradientBtnStyles();
  const chubbyStyles = useGradientBtnStyles({ chubby: true });
  const gutterStyles = usePushingGutterStyles({ cssProp: 'marginBottom', space: 2 });
  return (
    <Grid container spacing={4} justify={'center'} style={{width: "500px"}}>
      <Grid item  md={7} style={{width: "900px"}}>
        <Column className={styles.card} p={{ xs: 0.5, sm: 0.75, lg: 1 }} gap={gap}>
          <Row {...props}>
            <Item position={'middle'}>
              <Typography className={styles.title}>
                <b>{props.hotel.name}</b>

                <Rating name="read-only" value={props.hotel.rating} readOnly />

              </Typography>
              <Typography className={styles.subheader}>
                {props.hotel.address.cityName}, {props.hotel.address.lines[0]}
              </Typography>

            </Item>
            <Item position={'right'} mr={-0.5}>

            </Item>
          </Row>
          <Item position={'middle'}>

            <Typography className={styles.title}>
              Date
        </Typography>

            <Typography className={styles.subheader}>
              {props.room.checkInDate} - {props.room.checkOutDate}
            </Typography>

            <Typography className={styles.title}>
              Description
        </Typography>

            <Typography className={styles.subheader}>
              {props.room.room.description.text}

            </Typography>

            <Typography className={styles.title}>
              price : {props.room.price.total}

              <div className={gutterStyles.parent}>
                <div>
                  <Button onClick={() => goCheckout()} classes={stylesbtn}>More </Button>
                </div>

              </div>
            </Typography>


          </Item>
        </Column>
      </Grid>
    </Grid>
  );
});
export default HotelCard