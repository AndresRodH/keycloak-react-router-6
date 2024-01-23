import { redirect } from "react-router-dom";
import Keycloak from "keycloak-js";

let keycloak: Keycloak | undefined;

/**
 * Returns the Keycloak instance. This function will make sure that the Keycloak instance is only initialized _once_
 */
async function getKeycloak() {
	if (keycloak) {
		return keycloak;
	}

	keycloak = new Keycloak({
		url: import.meta.env.VITE_KEYCLOAK_URL,
		realm: import.meta.env.VITE_KEYCLOAK_REALM,
		clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
	});

	await keycloak.init({
		onLoad: "check-sso",
		redirectUri: "http://localhost:5173",
	});

	return keycloak;
}

/**
 * Creates a Login URL with the current URL as the redirect URI
 */
export async function getLoginUrl() {
	const keycloak = await getKeycloak();

	return keycloak.createLoginUrl({
		redirectUri: window.location.origin + window.location.pathname,
	});
}

/**
 * Returns the user's profile if they are logged in, or `null` if they are not
 */
export async function getUserProfile() {
	const keycloak = await getKeycloak();

	if (keycloak.authenticated) {
		const profile = await keycloak.loadUserProfile();
		return profile;
	}

	return null;
}

/**
 * Requires that the user is logged in. Returns the user's profile if they are and throws a redirect if they are not.
 */
export async function requireUser() {
	const keycloak = await getKeycloak();

	const profile = await getUserProfile();

	if (profile) {
		return profile;
	}

	// user is not logged in
	const loginUrl = keycloak.createLoginUrl({
		redirectUri: window.location.origin + window.location.pathname,
	});

	throw redirect(loginUrl);
}

/**
 * Logs the user out
 */
export async function logout() {
	const keycloak = await getKeycloak();

	if (keycloak.authenticated) {
		await keycloak.logout();
	}
}
