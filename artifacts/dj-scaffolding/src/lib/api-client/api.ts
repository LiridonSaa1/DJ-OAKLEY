import {
  useMutation,
  useQuery
} from '@tanstack/react-query';
import type {
  MutationFunction,
  QueryFunction,
  QueryKey,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query';

import type {
  AdminLoginInput,
  AdminSession,
  ContactInput,
  ContactSubmission,
  ContentSection,
  ContentSectionInput,
  HealthStatus,
  Service,
  ServiceInput
} from './api.schemas';

import { customFetch } from './custom-fetch';
import type { ErrorType, BodyType } from './custom-fetch';

type AwaitedInput<T> = PromiseLike<T> | T;
type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;
type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];

export const getHealthCheckUrl = () => `/api/healthz`;

export const healthCheck = async (options?: RequestInit): Promise<HealthStatus> =>
  customFetch<HealthStatus>(getHealthCheckUrl(), { ...options, method: 'GET' });

export const getHealthCheckQueryKey = () => [`/api/healthz`] as const;

export const getHealthCheckQueryOptions = <TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>; request?: SecondParameter<typeof customFetch> }) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getHealthCheckQueryKey();
  const queryFn: QueryFunction<Awaited<ReturnType<typeof healthCheck>>> = ({ signal }) => healthCheck({ signal, ...requestOptions });
  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData> & { queryKey: QueryKey };
};

export type HealthCheckQueryResult = NonNullable<Awaited<ReturnType<typeof healthCheck>>>;
export type HealthCheckQueryError = ErrorType<unknown>;

export function useHealthCheck<TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>; request?: SecondParameter<typeof customFetch> }): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getHealthCheckQueryOptions(options);
  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };
  return { ...query, queryKey: queryOptions.queryKey };
}

export const getSubmitContactUrl = () => `/api/contact`;

export const submitContact = async (contactInput: ContactInput, options?: RequestInit): Promise<ContactSubmission> =>
  customFetch<ContactSubmission>(getSubmitContactUrl(), { ...options, method: 'POST', headers: { 'Content-Type': 'application/json', ...options?.headers }, body: JSON.stringify(contactInput) });

export const getSubmitContactMutationOptions = <TError = ErrorType<void>, TContext = unknown>(options?: { mutation?: UseMutationOptions<Awaited<ReturnType<typeof submitContact>>, TError, { data: BodyType<ContactInput> }, TContext>; request?: SecondParameter<typeof customFetch> }): UseMutationOptions<Awaited<ReturnType<typeof submitContact>>, TError, { data: BodyType<ContactInput> }, TContext> => {
  const mutationKey = ['submitContact'];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: undefined };
  const mutationFn: MutationFunction<Awaited<ReturnType<typeof submitContact>>, { data: BodyType<ContactInput> }> = (props) => { const { data } = props ?? {}; return submitContact(data, requestOptions); };
  return { mutationFn, ...mutationOptions };
};

export type SubmitContactMutationResult = NonNullable<Awaited<ReturnType<typeof submitContact>>>;
export type SubmitContactMutationBody = BodyType<ContactInput>;
export type SubmitContactMutationError = ErrorType<void>;

export const useSubmitContact = <TError = ErrorType<void>, TContext = unknown>(options?: { mutation?: UseMutationOptions<Awaited<ReturnType<typeof submitContact>>, TError, { data: BodyType<ContactInput> }, TContext>; request?: SecondParameter<typeof customFetch> }): UseMutationResult<Awaited<ReturnType<typeof submitContact>>, TError, { data: BodyType<ContactInput> }, TContext> =>
  useMutation(getSubmitContactMutationOptions(options));

export const getListContactSubmissionsUrl = () => `/api/contact/submissions`;

export const listContactSubmissions = async (options?: RequestInit): Promise<ContactSubmission[]> =>
  customFetch<ContactSubmission[]>(getListContactSubmissionsUrl(), { ...options, method: 'GET' });

export const getListContactSubmissionsQueryKey = () => [`/api/contact/submissions`] as const;

export const getListContactSubmissionsQueryOptions = <TData = Awaited<ReturnType<typeof listContactSubmissions>>, TError = ErrorType<unknown>>(options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof listContactSubmissions>>, TError, TData>; request?: SecondParameter<typeof customFetch> }) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getListContactSubmissionsQueryKey();
  const queryFn: QueryFunction<Awaited<ReturnType<typeof listContactSubmissions>>> = ({ signal }) => listContactSubmissions({ signal, ...requestOptions });
  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<Awaited<ReturnType<typeof listContactSubmissions>>, TError, TData> & { queryKey: QueryKey };
};

export type ListContactSubmissionsQueryResult = NonNullable<Awaited<ReturnType<typeof listContactSubmissions>>>;
export type ListContactSubmissionsQueryError = ErrorType<unknown>;

export function useListContactSubmissions<TData = Awaited<ReturnType<typeof listContactSubmissions>>, TError = ErrorType<unknown>>(options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof listContactSubmissions>>, TError, TData>; request?: SecondParameter<typeof customFetch> }): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getListContactSubmissionsQueryOptions(options);
  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };
  return { ...query, queryKey: queryOptions.queryKey };
}

export const getListContentSectionsUrl = () => `/api/content/sections`;

export const listContentSections = async (options?: RequestInit): Promise<ContentSection[]> =>
  customFetch<ContentSection[]>(getListContentSectionsUrl(), { ...options, method: 'GET' });

export const getListContentSectionsQueryKey = () => [`/api/content/sections`] as const;

export const getListContentSectionsQueryOptions = <TData = Awaited<ReturnType<typeof listContentSections>>, TError = ErrorType<unknown>>(options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof listContentSections>>, TError, TData>; request?: SecondParameter<typeof customFetch> }) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getListContentSectionsQueryKey();
  const queryFn: QueryFunction<Awaited<ReturnType<typeof listContentSections>>> = ({ signal }) => listContentSections({ signal, ...requestOptions });
  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<Awaited<ReturnType<typeof listContentSections>>, TError, TData> & { queryKey: QueryKey };
};

export type ListContentSectionsQueryResult = NonNullable<Awaited<ReturnType<typeof listContentSections>>>;
export type ListContentSectionsQueryError = ErrorType<unknown>;

export function useListContentSections<TData = Awaited<ReturnType<typeof listContentSections>>, TError = ErrorType<unknown>>(options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof listContentSections>>, TError, TData>; request?: SecondParameter<typeof customFetch> }): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getListContentSectionsQueryOptions(options);
  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };
  return { ...query, queryKey: queryOptions.queryKey };
}

export const getGetContentSectionUrl = (key: string) => `/api/content/sections/${key}`;

export const getContentSection = async (key: string, options?: RequestInit): Promise<ContentSection> =>
  customFetch<ContentSection>(getGetContentSectionUrl(key), { ...options, method: 'GET' });

export const getGetContentSectionQueryKey = (key: string) => [`/api/content/sections/${key}`] as const;

export const getGetContentSectionQueryOptions = <TData = Awaited<ReturnType<typeof getContentSection>>, TError = ErrorType<void>>(key: string, options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof getContentSection>>, TError, TData>; request?: SecondParameter<typeof customFetch> }) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getGetContentSectionQueryKey(key);
  const queryFn: QueryFunction<Awaited<ReturnType<typeof getContentSection>>> = ({ signal }) => getContentSection(key, { signal, ...requestOptions });
  return { queryKey, queryFn, enabled: !!(key), ...queryOptions } as UseQueryOptions<Awaited<ReturnType<typeof getContentSection>>, TError, TData> & { queryKey: QueryKey };
};

export type GetContentSectionQueryResult = NonNullable<Awaited<ReturnType<typeof getContentSection>>>;
export type GetContentSectionQueryError = ErrorType<void>;

export function useGetContentSection<TData = Awaited<ReturnType<typeof getContentSection>>, TError = ErrorType<void>>(key: string, options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof getContentSection>>, TError, TData>; request?: SecondParameter<typeof customFetch> }): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getGetContentSectionQueryOptions(key, options);
  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };
  return { ...query, queryKey: queryOptions.queryKey };
}

export const getUpdateContentSectionUrl = (key: string) => `/api/content/sections/${key}`;

export const updateContentSection = async (key: string, contentSectionInput: ContentSectionInput, options?: RequestInit): Promise<ContentSection> =>
  customFetch<ContentSection>(getUpdateContentSectionUrl(key), { ...options, method: 'PUT', headers: { 'Content-Type': 'application/json', ...options?.headers }, body: JSON.stringify(contentSectionInput) });

export const getUpdateContentSectionMutationOptions = <TError = ErrorType<unknown>, TContext = unknown>(options?: { mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateContentSection>>, TError, { key: string; data: BodyType<ContentSectionInput> }, TContext>; request?: SecondParameter<typeof customFetch> }): UseMutationOptions<Awaited<ReturnType<typeof updateContentSection>>, TError, { key: string; data: BodyType<ContentSectionInput> }, TContext> => {
  const mutationKey = ['updateContentSection'];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: undefined };
  const mutationFn: MutationFunction<Awaited<ReturnType<typeof updateContentSection>>, { key: string; data: BodyType<ContentSectionInput> }> = (props) => { const { key, data } = props ?? {}; return updateContentSection(key, data, requestOptions); };
  return { mutationFn, ...mutationOptions };
};

export type UpdateContentSectionMutationResult = NonNullable<Awaited<ReturnType<typeof updateContentSection>>>;
export type UpdateContentSectionMutationBody = BodyType<ContentSectionInput>;
export type UpdateContentSectionMutationError = ErrorType<unknown>;

export const useUpdateContentSection = <TError = ErrorType<unknown>, TContext = unknown>(options?: { mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateContentSection>>, TError, { key: string; data: BodyType<ContentSectionInput> }, TContext>; request?: SecondParameter<typeof customFetch> }): UseMutationResult<Awaited<ReturnType<typeof updateContentSection>>, TError, { key: string; data: BodyType<ContentSectionInput> }, TContext> =>
  useMutation(getUpdateContentSectionMutationOptions(options));

export const getListServicesUrl = () => `/api/services`;

export const listServices = async (options?: RequestInit): Promise<Service[]> =>
  customFetch<Service[]>(getListServicesUrl(), { ...options, method: 'GET' });

export const getListServicesQueryKey = () => [`/api/services`] as const;

export const getListServicesQueryOptions = <TData = Awaited<ReturnType<typeof listServices>>, TError = ErrorType<unknown>>(options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof listServices>>, TError, TData>; request?: SecondParameter<typeof customFetch> }) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getListServicesQueryKey();
  const queryFn: QueryFunction<Awaited<ReturnType<typeof listServices>>> = ({ signal }) => listServices({ signal, ...requestOptions });
  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<Awaited<ReturnType<typeof listServices>>, TError, TData> & { queryKey: QueryKey };
};

export type ListServicesQueryResult = NonNullable<Awaited<ReturnType<typeof listServices>>>;
export type ListServicesQueryError = ErrorType<unknown>;

export function useListServices<TData = Awaited<ReturnType<typeof listServices>>, TError = ErrorType<unknown>>(options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof listServices>>, TError, TData>; request?: SecondParameter<typeof customFetch> }): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getListServicesQueryOptions(options);
  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };
  return { ...query, queryKey: queryOptions.queryKey };
}

export const getCreateServiceUrl = () => `/api/services`;

export const createService = async (serviceInput: ServiceInput, options?: RequestInit): Promise<Service> =>
  customFetch<Service>(getCreateServiceUrl(), { ...options, method: 'POST', headers: { 'Content-Type': 'application/json', ...options?.headers }, body: JSON.stringify(serviceInput) });

export const getCreateServiceMutationOptions = <TError = ErrorType<unknown>, TContext = unknown>(options?: { mutation?: UseMutationOptions<Awaited<ReturnType<typeof createService>>, TError, { data: BodyType<ServiceInput> }, TContext>; request?: SecondParameter<typeof customFetch> }): UseMutationOptions<Awaited<ReturnType<typeof createService>>, TError, { data: BodyType<ServiceInput> }, TContext> => {
  const mutationKey = ['createService'];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: undefined };
  const mutationFn: MutationFunction<Awaited<ReturnType<typeof createService>>, { data: BodyType<ServiceInput> }> = (props) => { const { data } = props ?? {}; return createService(data, requestOptions); };
  return { mutationFn, ...mutationOptions };
};

export type CreateServiceMutationResult = NonNullable<Awaited<ReturnType<typeof createService>>>;
export type CreateServiceMutationBody = BodyType<ServiceInput>;
export type CreateServiceMutationError = ErrorType<unknown>;

export const useCreateService = <TError = ErrorType<unknown>, TContext = unknown>(options?: { mutation?: UseMutationOptions<Awaited<ReturnType<typeof createService>>, TError, { data: BodyType<ServiceInput> }, TContext>; request?: SecondParameter<typeof customFetch> }): UseMutationResult<Awaited<ReturnType<typeof createService>>, TError, { data: BodyType<ServiceInput> }, TContext> =>
  useMutation(getCreateServiceMutationOptions(options));

export const getUpdateServiceUrl = (id: number) => `/api/services/${id}`;

export const updateService = async (id: number, serviceInput: ServiceInput, options?: RequestInit): Promise<Service> =>
  customFetch<Service>(getUpdateServiceUrl(id), { ...options, method: 'PUT', headers: { 'Content-Type': 'application/json', ...options?.headers }, body: JSON.stringify(serviceInput) });

export const getUpdateServiceMutationOptions = <TError = ErrorType<unknown>, TContext = unknown>(options?: { mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateService>>, TError, { id: number; data: BodyType<ServiceInput> }, TContext>; request?: SecondParameter<typeof customFetch> }): UseMutationOptions<Awaited<ReturnType<typeof updateService>>, TError, { id: number; data: BodyType<ServiceInput> }, TContext> => {
  const mutationKey = ['updateService'];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: undefined };
  const mutationFn: MutationFunction<Awaited<ReturnType<typeof updateService>>, { id: number; data: BodyType<ServiceInput> }> = (props) => { const { id, data } = props ?? {}; return updateService(id, data, requestOptions); };
  return { mutationFn, ...mutationOptions };
};

export type UpdateServiceMutationResult = NonNullable<Awaited<ReturnType<typeof updateService>>>;
export type UpdateServiceMutationBody = BodyType<ServiceInput>;
export type UpdateServiceMutationError = ErrorType<unknown>;

export const useUpdateService = <TError = ErrorType<unknown>, TContext = unknown>(options?: { mutation?: UseMutationOptions<Awaited<ReturnType<typeof updateService>>, TError, { id: number; data: BodyType<ServiceInput> }, TContext>; request?: SecondParameter<typeof customFetch> }): UseMutationResult<Awaited<ReturnType<typeof updateService>>, TError, { id: number; data: BodyType<ServiceInput> }, TContext> =>
  useMutation(getUpdateServiceMutationOptions(options));

export const getDeleteServiceUrl = (id: number) => `/api/services/${id}`;

export const deleteService = async (id: number, options?: RequestInit): Promise<void> =>
  customFetch<void>(getDeleteServiceUrl(id), { ...options, method: 'DELETE' });

export const getDeleteServiceMutationOptions = <TError = ErrorType<unknown>, TContext = unknown>(options?: { mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteService>>, TError, { id: number }, TContext>; request?: SecondParameter<typeof customFetch> }): UseMutationOptions<Awaited<ReturnType<typeof deleteService>>, TError, { id: number }, TContext> => {
  const mutationKey = ['deleteService'];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: undefined };
  const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteService>>, { id: number }> = (props) => { const { id } = props ?? {}; return deleteService(id, requestOptions); };
  return { mutationFn, ...mutationOptions };
};

export type DeleteServiceMutationResult = NonNullable<Awaited<ReturnType<typeof deleteService>>>;
export type DeleteServiceMutationError = ErrorType<unknown>;

export const useDeleteService = <TError = ErrorType<unknown>, TContext = unknown>(options?: { mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteService>>, TError, { id: number }, TContext>; request?: SecondParameter<typeof customFetch> }): UseMutationResult<Awaited<ReturnType<typeof deleteService>>, TError, { id: number }, TContext> =>
  useMutation(getDeleteServiceMutationOptions(options));

export const getAdminLoginUrl = () => `/api/admin/login`;

export const adminLogin = async (adminLoginInput: AdminLoginInput, options?: RequestInit): Promise<AdminSession> =>
  customFetch<AdminSession>(getAdminLoginUrl(), { ...options, method: 'POST', headers: { 'Content-Type': 'application/json', ...options?.headers }, body: JSON.stringify(adminLoginInput) });

export const getAdminLoginMutationOptions = <TError = ErrorType<void>, TContext = unknown>(options?: { mutation?: UseMutationOptions<Awaited<ReturnType<typeof adminLogin>>, TError, { data: BodyType<AdminLoginInput> }, TContext>; request?: SecondParameter<typeof customFetch> }): UseMutationOptions<Awaited<ReturnType<typeof adminLogin>>, TError, { data: BodyType<AdminLoginInput> }, TContext> => {
  const mutationKey = ['adminLogin'];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: undefined };
  const mutationFn: MutationFunction<Awaited<ReturnType<typeof adminLogin>>, { data: BodyType<AdminLoginInput> }> = (props) => { const { data } = props ?? {}; return adminLogin(data, requestOptions); };
  return { mutationFn, ...mutationOptions };
};

export type AdminLoginMutationResult = NonNullable<Awaited<ReturnType<typeof adminLogin>>>;
export type AdminLoginMutationBody = BodyType<AdminLoginInput>;
export type AdminLoginMutationError = ErrorType<void>;

export const useAdminLogin = <TError = ErrorType<void>, TContext = unknown>(options?: { mutation?: UseMutationOptions<Awaited<ReturnType<typeof adminLogin>>, TError, { data: BodyType<AdminLoginInput> }, TContext>; request?: SecondParameter<typeof customFetch> }): UseMutationResult<Awaited<ReturnType<typeof adminLogin>>, TError, { data: BodyType<AdminLoginInput> }, TContext> =>
  useMutation(getAdminLoginMutationOptions(options));

export const getAdminLogoutUrl = () => `/api/admin/logout`;

export const adminLogout = async (options?: RequestInit): Promise<void> =>
  customFetch<void>(getAdminLogoutUrl(), { ...options, method: 'POST' });

export const getAdminLogoutMutationOptions = <TError = ErrorType<unknown>, TContext = unknown>(options?: { mutation?: UseMutationOptions<Awaited<ReturnType<typeof adminLogout>>, TError, void, TContext>; request?: SecondParameter<typeof customFetch> }): UseMutationOptions<Awaited<ReturnType<typeof adminLogout>>, TError, void, TContext> => {
  const mutationKey = ['adminLogout'];
  const { mutation: mutationOptions, request: requestOptions } = options ? options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey ? options : { ...options, mutation: { ...options.mutation, mutationKey } } : { mutation: { mutationKey }, request: undefined };
  const mutationFn: MutationFunction<Awaited<ReturnType<typeof adminLogout>>, void> = () => adminLogout(requestOptions);
  return { mutationFn, ...mutationOptions };
};

export type AdminLogoutMutationResult = NonNullable<Awaited<ReturnType<typeof adminLogout>>>;
export type AdminLogoutMutationError = ErrorType<unknown>;

export const useAdminLogout = <TError = ErrorType<unknown>, TContext = unknown>(options?: { mutation?: UseMutationOptions<Awaited<ReturnType<typeof adminLogout>>, TError, void, TContext>; request?: SecondParameter<typeof customFetch> }): UseMutationResult<Awaited<ReturnType<typeof adminLogout>>, TError, void, TContext> =>
  useMutation(getAdminLogoutMutationOptions(options));

export const getGetAdminSessionUrl = () => `/api/admin/me`;

export const getAdminSession = async (options?: RequestInit): Promise<AdminSession> =>
  customFetch<AdminSession>(getGetAdminSessionUrl(), { ...options, method: 'GET' });

export const getGetAdminSessionQueryKey = () => [`/api/admin/me`] as const;

export const getGetAdminSessionQueryOptions = <TData = Awaited<ReturnType<typeof getAdminSession>>, TError = ErrorType<void>>(options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof getAdminSession>>, TError, TData>; request?: SecondParameter<typeof customFetch> }) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};
  const queryKey = queryOptions?.queryKey ?? getGetAdminSessionQueryKey();
  const queryFn: QueryFunction<Awaited<ReturnType<typeof getAdminSession>>> = ({ signal }) => getAdminSession({ signal, ...requestOptions });
  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<Awaited<ReturnType<typeof getAdminSession>>, TError, TData> & { queryKey: QueryKey };
};

export type GetAdminSessionQueryResult = NonNullable<Awaited<ReturnType<typeof getAdminSession>>>;
export type GetAdminSessionQueryError = ErrorType<void>;

export function useGetAdminSession<TData = Awaited<ReturnType<typeof getAdminSession>>, TError = ErrorType<void>>(options?: { query?: UseQueryOptions<Awaited<ReturnType<typeof getAdminSession>>, TError, TData>; request?: SecondParameter<typeof customFetch> }): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getGetAdminSessionQueryOptions(options);
  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };
  return { ...query, queryKey: queryOptions.queryKey };
}
