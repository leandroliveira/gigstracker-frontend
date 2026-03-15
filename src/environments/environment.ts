export const environment = {
    production: false,
    supabaseUrl: import.meta.env['NG_APP_SUPABASE_URL'],
    supabaseAnonKey: import.meta.env['NG_APP_SUPABASE_ANON_KEY'],
    apiBaseUrl: import.meta.env['NG_APP_API_BASE_URL'],
    githubRepoUrl: import.meta.env['NG_APP_GITHUB_REPO_URL']
};
