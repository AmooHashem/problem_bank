import { Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import EventCard from '../components/Cards/Event';
import JoinEvent from '../components/Dialog/JoinEvent';
import {
  getEventsAction,
} from '../redux/slices/event';
import Layout from '../components/templates/Layout';

const Events = ({
  getEvents,
  events,
}) => {
  const { eventId } = useParams();
  const [showJoinEventDialog, setShowEventDialog] = useState(false);

  useEffect(() => {
    if (eventId) {
      setShowEventDialog(true);
    } else {
      setShowEventDialog(false);
    }
  }, [eventId])

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <Layout backgroundImage=''>
      <Grid container spacing={4} justifyContent='center' alignItems='flex-start'>
        <Grid item xs={12}>
          <Typography variant="h1" align="center" gutterBottom>
            {'«کلاس‌ها»'}
          </Typography>
        </Grid>
        <Grid container item xs={12} spacing={2}>
          {events?.map((event, index) => (
            <Grid key={index} item xs={12} sm={4} md={3}>
              <EventCard {...event} />
            </Grid>
          ))}
        </Grid>
      </Grid >
      <JoinEvent eventId={eventId} open={showJoinEventDialog} />
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  events: state.event.events,
});

export default connect(
  mapStateToProps,
  {
    getEvents: getEventsAction,
  }
)(Events);
