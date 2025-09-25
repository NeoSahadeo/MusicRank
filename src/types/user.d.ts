export type UserType = {
	user: {
		id: string;
		aud: string;
		role: string;
		email: string;
		email_confirmed_at: string;
		phone: string;
		confirmed_at: string;
		last_sign_in_at: string;
		app_metadata: {
			provider: string;
			providers: any[]; // Could be further typed if structure is known
		};
		user_metadata: {
			avatar_url: string;
			email: string;
			email_verified: boolean;
			full_name: string;
			iss: string;
			name: string;
			phone_verified: boolean;
			picture: string;
			provider_id: string;
			sub: string;
		};
		identities: any[]; // Could be further typed if structure is known
		created_at: string;
		updated_at: string;
		is_anonymous: boolean;
	};
};
