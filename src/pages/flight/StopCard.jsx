import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import AirplanemodeActive from '@material-ui/icons/AirplanemodeActive';
import VerticalTicketRip from '@mui-treasury/components/rip/verticalTicket';
import { useVerticalRipStyles } from '@mui-treasury/styles/rip/vertical';
import Moment from 'moment';


const mainColor = '#003399';
const lightColor = '#ecf2ff';
const borderRadius = 12;

const useStyles = makeStyles(({ palette, breakpoints }) => ({
  card: {
    overflow: 'visible',
    background: 'none',
    display: 'flex',
    minWidth: 343,
    minHeight: 150,
    filter: 'drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.3))',
    '& $moveLeft, $moveRight': {
      transition: '0.3s',
    },
    '&:hover': {
      '& $moveLeft': {
        transform: 'translateX(-8px)',
      },
      '& $moveRight': {
        transform: 'translateX(8px)',
      },
    },
    [breakpoints.up('sm')]: {
      minWidth: 400,
    },
  },
  left: {

    flexBasis: '33.33%',
    display: 'flex',
    backgroundColor: '#fff',
    flexDirection:"column",
    padding: 50,
    alignItems: 'center',
    textAlign: 'center',
    borderTopRightRadius: borderRadius,
    borderBottomRightRadius: borderRadius,

  },
  media: {
    margin: 'auto',
    width: 80,
    height: 80,
    borderRadius: '50%',
  },
  right: {
    borderTopRightRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    flex: 1,
    padding: 12,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: lightColor,
  },
  label: {
    padding: '0 8px',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 0,
    marginBottom: 4,
  },
  subheader: {
    fontSize: 12,
    margin: 0,
    color: palette.text.secondary,
  },
  path: {
    flex: 1,
    flexBasis: 72,
    padding: '0 4px',
  },
  line: {
    position: 'relative',
    margin: '20px 0 16px',
    borderBottom: '1px dashed rgba(0,0,0,0.38)',
  },
  plane: {
    position: 'absolute',
    display: 'inline-block',
    padding: '0 4px',
    fontSize: 32,
    backgroundColor: lightColor,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) rotate(90deg)',
  },
  flight: {
    fontSize: 14,
    lineHeight: '24px',
    minWidth: 48,
    padding: '0 8px',
    borderRadius: 40,
    backgroundColor: '#bed0f5',
    color: mainColor,
    display: 'block',
  },
  moveLeft: {},
  moveRight: {},
}));

export const StopCard = React.memo(function StopCard(props) {
  const styles = useStyles();
  const ripStyles = useVerticalRipStyles({
    size: 24,
    rightColor: lightColor,
    tearColor: mainColor,
  });
  return (
      
      <div style={{margin : 10}}>
    <Card className={styles.card} elevation={0}>
      <div className={cx(styles.left, styles.moveLeft)}>

        <h1>{props.flight?.price.grandTotal} {}</h1>        
        <p>{props.flight?.travelerPricings[0].fareDetailsBySegment[0].cabin}</p>

      </div>
      <VerticalTicketRip
        classes={{
          ...ripStyles,
          left: cx(ripStyles.left, styles.moveLeft),
          right: cx(ripStyles.right, styles.moveRight),
        }}
      />
      <div className={cx(styles.right, styles.moveRight)}>
        <div className={styles.label}>
          <h2 className={styles.heading}>{props.flight?.itineraries[0].segments[0].departure.iataCode}</h2>
          <p className={styles.subheader}>{Moment(props.flight?.itineraries[0].segments[0].departure.at).format('HH:mm')}</p>
        </div>
        <div className={styles.path}>
          <div className={styles.line}>
            <AirplanemodeActive className={styles.plane} />
          </div>
          <span className={styles.flight}>Stop at {props.flight?.itineraries[0].segments[0].arrival.iataCode} {Moment(props.flight?.itineraries[0].segments[0].arrival.at).format('HH:mm')}</span>

        </div>
        <div className={styles.label}>
          <h2 className={styles.heading}>{props.flight?.itineraries[0].segments[1].arrival.iataCode}</h2>
          <p className={styles.subheader}>{Moment(props.flight?.itineraries[0].segments[1].arrival.at).format('HH:mm')}</p>
        </div>
      </div>
      
    </Card>

    
    </div>

    
  );
});

export default StopCard;