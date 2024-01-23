import Keycloak from "keycloak-js";

export const keycloak = new Keycloak({
	url: import.meta.env.VITE_KEYCLOAK_URL,
	realm: import.meta.env.VITE_KEYCLOAK_REALM,
	clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
});

/**
 * Returns the user's profile if they are logged in, or `null` if they are not
 */
export async function getUserProfile() {
	const profile = await keycloak.loadUserProfile();
	return profile;
}

/**
 * Logs the user out
 */
export async function logout() {
	if (keycloak.authenticated) {
		await keycloak.logout();
	}
}
