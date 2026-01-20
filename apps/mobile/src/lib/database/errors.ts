/**
 * Database Error Types
 * Provides structured error handling for database operations
 */

export enum DatabaseErrorCode {
    CONNECTION_FAILED = 'CONNECTION_FAILED',
    QUERY_FAILED = 'QUERY_FAILED',
    INSERT_FAILED = 'INSERT_FAILED',
    UPDATE_FAILED = 'UPDATE_FAILED',
    DELETE_FAILED = 'DELETE_FAILED',
    NOT_FOUND = 'NOT_FOUND',
    CONSTRAINT_VIOLATION = 'CONSTRAINT_VIOLATION',
    MIGRATION_FAILED = 'MIGRATION_FAILED',
    UNKNOWN = 'UNKNOWN',
}

export interface DatabaseErrorDetails {
    code: DatabaseErrorCode;
    operation: string;
    table?: string;
    originalError?: Error;
    query?: string;
    params?: unknown[];
}

export class DatabaseError extends Error {
    public readonly code: DatabaseErrorCode;
    public readonly operation: string;
    public readonly table?: string;
    public readonly originalError?: Error;
    public readonly query?: string;
    public readonly params?: unknown[];

    constructor(message: string, details: DatabaseErrorDetails) {
        super(message);
        this.name = 'DatabaseError';
        this.code = details.code;
        this.operation = details.operation;
        this.table = details.table;
        this.originalError = details.originalError;
        this.query = details.query;
        this.params = details.params;

        // Maintains proper stack trace for where our error was thrown
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, DatabaseError);
        }
    }

    toJSON() {
        return {
            name: this.name,
            message: this.message,
            code: this.code,
            operation: this.operation,
            table: this.table,
            query: this.query,
        };
    }

    static connectionFailed(error: Error): DatabaseError {
        return new DatabaseError('Database connection failed', {
            code: DatabaseErrorCode.CONNECTION_FAILED,
            operation: 'connect',
            originalError: error,
        });
    }

    static insertFailed(table: string, error: Error, query?: string): DatabaseError {
        return new DatabaseError(`Failed to insert into ${table}`, {
            code: DatabaseErrorCode.INSERT_FAILED,
            operation: 'insert',
            table,
            originalError: error,
            query,
        });
    }

    static updateFailed(table: string, error: Error, query?: string): DatabaseError {
        return new DatabaseError(`Failed to update ${table}`, {
            code: DatabaseErrorCode.UPDATE_FAILED,
            operation: 'update',
            table,
            originalError: error,
            query,
        });
    }

    static deleteFailed(table: string, error: Error, query?: string): DatabaseError {
        return new DatabaseError(`Failed to delete from ${table}`, {
            code: DatabaseErrorCode.DELETE_FAILED,
            operation: 'delete',
            table,
            originalError: error,
            query,
        });
    }

    static queryFailed(table: string, error: Error, query?: string): DatabaseError {
        return new DatabaseError(`Query failed on ${table}`, {
            code: DatabaseErrorCode.QUERY_FAILED,
            operation: 'query',
            table,
            originalError: error,
            query,
        });
    }

    static notFound(table: string, id: string): DatabaseError {
        return new DatabaseError(`Record not found in ${table} with id: ${id}`, {
            code: DatabaseErrorCode.NOT_FOUND,
            operation: 'getById',
            table,
        });
    }
}

/**
 * Type guard to check if an error is a DatabaseError
 */
export function isDatabaseError(error: unknown): error is DatabaseError {
    return error instanceof DatabaseError;
}
