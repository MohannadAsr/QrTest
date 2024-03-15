import { useApi } from '@src/hooks/useApi';
import { useMutation, useQuery } from '@tanstack/react-query';
import { CreateEventDTO, EventDTO, InvitaionByEventDto } from './Dto';
import { EVENTS_API } from './EndPoints';
import { Invitations_API } from '../Invitaions/EndPoints';

const { POST, GET } = useApi();

const getEvents = async () => {
  const response = await GET<{ data: EventDTO[] }>(EVENTS_API.main);
  return response.data.data;
};
const addEventById = async (id: string) => {
  const response = await GET<{ data: EventDTO }>(`${EVENTS_API.ById}${id}`);
  return response.data.data;
};
const addEvent = async (payload: CreateEventDTO) => {
  const response = await POST(EVENTS_API.main, payload, { formData: true });
  return response;
};

const getEventInvitations = async (payload: string) => {
  const response = await GET<{
    data: InvitaionByEventDto[];
    totalCount: number;
  }>(`${Invitations_API.InvitaionsByEvent}${payload}`);
  return response.data;
};
export const MutateAddEvent = () => {
  return useMutation({
    mutationKey: ['addEvent'],
    mutationFn: (payload: CreateEventDTO) => addEvent(payload),
  });
};

export const useEventsQueries = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: getEvents,
    refetchOnWindowFocus: false,
  });
};

export const useEventByIdQueries = (id: string) => {
  return useQuery({
    queryKey: ['eventById', id],
    queryFn: () => addEventById(id),
    refetchOnWindowFocus: false,
  });
};

export const useInvitaionsByEventQuery = (id: string) => {
  return useQuery({
    queryKey: ['invitaionsById', id],
    queryFn: () => getEventInvitations(id),
    refetchOnWindowFocus: false,
  });
};
