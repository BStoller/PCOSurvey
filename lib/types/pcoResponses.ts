export interface TeamsResponse {
  links: {
    self: string;
  };
  data: Team[];
  included?: ServiceType[];
  meta: {
    total_count: number;
    count: number;
    can_order_by: string[];
    can_query_by: string[];
    can_include: string[];
    parent: {
      type: string;
      id: string;
    };
  };
}

export interface Team {
  type: string;
  id: string;
  attributes: {
    archived_at: null;
    assigned_directly: boolean;
    created_at: string;
    default_prepare_notifications: boolean;
    default_status: string;
    last_plan_from: string;
    name: string;
    rehearsal_team: boolean;
    schedule_to: string;
    secure_team: boolean;
    sequence: null;
    stage_color: string;
    stage_variant: string;
    updated_at: string;
    viewers_see: number;
  };

  relationships?: {
    service_type?: {
      links?: {
        self?: string;
      };
      data?: {
        type?: string;
        id?: string;
      };
    };
  };
}

export interface ServiceType {
  type?: string;
  id?: string;
  attributes?: {
    archived_at?: null;
    attachment_types_enabled?: boolean;
    background_check_permissions?: string;
    comment_permissions?: string;
    created_at?: string;
    custom_?: any[];
    default_prepare_notifications?: boolean;
    default_status?: string;
    description?: null | string;
    email_permissions?: null | string;
    event_permissions?: null | string;
    last_plan_from?: null | string;
    name?: null | string;
    rehearsal_team?: boolean;
    schedule_to?: null | string;
    secure_team?: boolean;
    sequence?: null | number;
    stage_color?: null | string;
    stage_variant?: null | string;
    updated_at?: null | string;
  };
}
