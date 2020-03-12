/**
 * Write Schema for Pulse and pulse related models
 * These are Typescript interfaces are intend to relay the expected collection schema in meteor
 */

interface ITimeStamps {
	createdAt: Date;
	lastUpdated: Date;
}

export interface IReminder {
	_id: string;
	customer: {
		// We attach a user profile to a pulse and track by ID, name and email
		name: string;
		_id: string;
		email: string;
	};
	transaction: {
		// Information about the transaction may be attached to a pulse
		_txId: string;
		txAmount: number;
		customer: {
			id: string; // take the ID of the customer should we need to query information
		};
	};
	rules: {
		// Accompanying rules can vary for each transaction
		interval: string;
		frequency: string;
		startDate: Date;
		endDate: Date;
		createdAt: Date;
	};
	executionTime: Date;
	createdAt: Date;
	priority: 'high' | 'medium' | 'low'; // could be an Enum to simplify things, we assign a priority to the jobs
	channels: Array<IReminderChannel>; // The is the channel we intend to execute the pulse from from
}

export interface IReminderChannel {
	name: string;
	medium: string;
	createdAt: Date;
	lastUpdated: Date;
	gateway?: string; // This could be the api endpoint or point of acess, the question mark means it can be optional
}

/**
 * Interface for the Users Profile
 */

export interface IUser {
	_id: string;
	email: string;
	phone: string;
	name: string;
	verified: boolean;
	createdAt: Date;
	lastUpdated: Date;
	profile: {
		workspace: {
			_id: string;
			name: string;
			type: 'organization' | 'individual';
		};
		subscription: {
			type: string; // preferably an ENUM will be used here
			_pk: string; // the subscription PK is a unique identifier, we may stick to ID
		};
		wallet: {
			balance: string;
			cleared: boolean;
			lastUpdated: Date;
		};
	};
}

export interface ITask {
	_id?: string;
	text: string;
	createdAt: Date;
	owner: string;
	username: string;
}

/**
 * These interfaces would manage the models that align with the record feature
 */

export interface ITransaction {
	_id: string;
}

export interface IEscalation extends ITransaction {
	_pk: string;
}

export interface IPaymentPlan {
	_id: string;
}
export interface IAgreementPlan {
	_id: string;
}

export interface IAgreementTemplate extends IAgreementPlan {
	createdAt: Date;
	lastUpdated: Date;
}

export interface IPaymentTemplate extends IPaymentPlan {
	createdAt: Date;
	lastUpdated: Date;
}

export interface ICustomer {
	_id: string;
	_pk: string;
	name: string;
	email: string;
	altEmail?: string;
	phone: string;
	altPhone?: number;
	address: string;
	inDebt: boolean;
	createdAt: Date;
	lastUpdated: Date;
	guarantor: {
		_id: string;
		_pk: string;
		email: string;
		address: string;
		phone: string;
		createdAt: Date;
		lastUpdated: Date;
	};
}