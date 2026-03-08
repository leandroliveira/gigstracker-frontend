import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, Session as SupabaseSession } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { Session } from '../models/session.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private supabase: SupabaseClient;
    private currentSessionSubject = new BehaviorSubject<Session | null>(null);

    constructor() {
        if (environment.supabaseUrl && environment.supabaseUrl !== 'YOUR_SUPABASE_URL' && environment.supabaseAnonKey && environment.supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY') {
            this.supabase = createClient(environment.supabaseUrl, environment.supabaseAnonKey);
            this.initSession();
        } else {
            console.warn('Supabase credentials not provided. Auth will not work functionality-wise.');
            this.supabase = {} as any; // Fallback to prevent crash
        }
    }

    private async initSession() {
        const { data: { session } } = await this.supabase.auth.getSession();
        if (session) {
            this.updateSessionSubject(session);
        }

        this.supabase.auth.onAuthStateChange((_event, session) => {
            this.updateSessionSubject(session);
        });
    }

    private updateSessionSubject(session: SupabaseSession | null) {
        if (session) {
            const appSession: Session = {
                accessToken: session.access_token,
                refreshToken: session.refresh_token,
                expiresAt: session.expires_at,
                userId: session.user.id,
                email: session.user.email
            };
            this.currentSessionSubject.next(appSession);
        } else {
            this.currentSessionSubject.next(null);
        }
    }

    get currentSession$(): Observable<Session | null> {
        return this.currentSessionSubject.asObservable();
    }

    get currentSessionValue(): Session | null {
        return this.currentSessionSubject.value;
    }

    async signup(email: string, password: string) {
        const { data, error } = await this.supabase.auth.signUp({
            email,
            password,
        });
        if (error) throw error;
        return data;
    }

    async login(email: string, password: string) {
        const { data, error } = await this.supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw error;
        return data;
    }

    async logout() {
        const { error } = await this.supabase.auth.signOut();
        if (error) throw error;
        this.currentSessionSubject.next(null);
    }
}
