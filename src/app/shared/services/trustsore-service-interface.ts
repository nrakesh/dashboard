import {Certificate, TrackingInstance} from '../models/certificate.model';

/**
 * Defines the contract for a service that interacts with a certificate truststore.
 *
 * Implementations of this interface are responsible for providing access to
 * trusted certificates and checking the service's operational status.
 *
 * @interface TruststoreServiceInterface
 */
export interface TruststoreServiceInterface {
  /**
   * Checks the availability and health of the truststore service. 핑
   * This method acts as a simple heartbeat to confirm that the service
   * is running and responsive.
   *
   * @returns {string} A status message, typically 'pong', indicating the service is active.
   */
  ping(): string;

  /**
   * Retrieves all certificates currently stored in the truststore.
   *
   * This method provides a complete list of `Certificate` objects that are
   * considered trusted by the application.
   *
   * @returns {Certificate[]} An array of `Certificate` objects. This array will be empty if the truststore contains no certificates.
   */
  getCertificates(): Certificate[];

  /**
   * Retrieves a collection of all tracking data instances.
   *
   * This method fetches the current tracking records, with each instance
   * typically representing a unique loader sessiona
   *
   * @returns {TrackingInstance[]} An array of `TrackingInstance` objects. Returns an empty array if no tracking data is available.
   */
  getTrackingData(): TrackingInstance[];
}
