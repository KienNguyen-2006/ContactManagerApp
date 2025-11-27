import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Alert,
  Linking,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useContacts} from '../../utils/ContactContext';
import CustomButton from '../../components/common/CustomButton';
import {Colors, Fonts, Spacing, GlobalStyles} from '../../styles/globalStyles';

const ContactDetailsScreen = ({navigation, route}) => {
  const {contacts, deleteContact, toggleFavorite} = useContacts();
  const {contactId} = route.params;

  const contact = contacts.find(c => c.id === contactId);
  const [loading, setLoading] = useState(false);

  if (!contact) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={[GlobalStyles.centered, styles.errorContainer]}>
          <Text style={styles.errorText}>Contact not found</Text>
          <CustomButton
            title="Go Back"
            onPress={() => navigation.goBack()}
            variant="outline"
          />
        </View>
      </SafeAreaView>
    );
  }

  const fullName = `${contact.firstName} ${contact.lastName}`;
  const initials = `${contact.firstName[0]}${contact.lastName[0]}`.toUpperCase();

  const handleCall = useCallback(() => {
    const url = `tel:${contact.phone}`;
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Phone calls are not supported on this device');
      }
    });
  }, [contact.phone]);

  const handleMessage = useCallback(() => {
    const url = `sms:${contact.phone}`;
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert('Error', 'SMS is not supported on this device');
      }
    });
  }, [contact.phone]);

  const handleEmail = useCallback(() => {
    const url = `mailto:${contact.email}`;
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Email is not supported on this device');
      }
    });
  }, [contact.email]);

  const handleEdit = useCallback(() => {
    navigation.navigate('AddContact', {contact});
  }, [navigation, contact]);

  const handleDelete = useCallback(() => {
    Alert.alert(
      'Delete Contact',
      `Are you sure you want to delete ${fullName}?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            try {
              await deleteContact(contact.id);
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete contact');
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  }, [contact.id, fullName, deleteContact, navigation]);

  const handleToggleFavorite = useCallback(async () => {
    await toggleFavorite(contact.id);
  }, [contact.id, toggleFavorite]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            {contact.avatar ? (
              <Image
                source={{uri: contact.avatar}}
                style={styles.avatar}
                accessible={true}
                accessibilityRole="image"
                accessibilityLabel={`${fullName} profile picture`}
              />
            ) : (
              <View style={[styles.avatar, styles.avatarPlaceholder]}>
                <Text style={styles.avatarText}>{initials}</Text>
              </View>
            )}
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={handleToggleFavorite}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={
                contact.favorite ? 'Remove from favorites' : 'Add to favorites'
              }
            >
              <Icon
                name={contact.favorite ? 'star' : 'star-border'}
                size={28}
                color={contact.favorite ? Colors.secondary : Colors.text.secondary}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.name}>{fullName}</Text>
          {contact.company && (
            <Text style={styles.company}>{contact.company}</Text>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleCall}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={`Call ${fullName}`}
          >
            <Icon name="phone" size={24} color={Colors.primary} />
            <Text style={styles.actionButtonText}>Call</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleMessage}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={`Message ${fullName}`}
          >
            <Icon name="message" size={24} color={Colors.primary} />
            <Text style={styles.actionButtonText}>Message</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleEmail}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={`Email ${fullName}`}
          >
            <Icon name="email" size={24} color={Colors.primary} />
            <Text style={styles.actionButtonText}>Email</Text>
          </TouchableOpacity>
        </View>

        {/* Contact Information */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Contact Information</Text>

          <View style={styles.infoItem}>
            <Icon name="phone" size={20} color={Colors.text.secondary} />
            <Text style={styles.infoText}>{contact.phone}</Text>
          </View>

          <View style={styles.infoItem}>
            <Icon name="email" size={20} color={Colors.text.secondary} />
            <Text style={styles.infoText}>{contact.email}</Text>
          </View>

          {contact.company && (
            <View style={styles.infoItem}>
              <Icon name="business" size={20} color={Colors.text.secondary} />
              <Text style={styles.infoText}>{contact.company}</Text>
            </View>
          )}
        </View>

        {/* Notes Section */}
        {contact.notes && (
          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Notes</Text>
            <Text style={styles.notesText}>{contact.notes}</Text>
          </View>
        )}
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.bottomButtons}>
        <CustomButton
          title="Edit Contact"
          onPress={handleEdit}
          variant="outline"
          style={styles.editButton}
        />
        <CustomButton
          title="Delete Contact"
          onPress={handleDelete}
          variant="outline"
          loading={loading}
          style={styles.deleteButton}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.container,
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    ...GlobalStyles.centered,
    paddingVertical: Spacing.xl,
    backgroundColor: Colors.surface,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: Colors.text.light,
    fontSize: Fonts.xlarge,
    fontWeight: 'bold',
  },
  favoriteButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  name: {
    fontSize: Fonts.xlarge,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  company: {
    fontSize: Fonts.medium,
    color: Colors.text.secondary,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: Spacing.lg,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionButtonText: {
    marginTop: Spacing.xs,
    fontSize: Fonts.small,
    color: Colors.primary,
    fontWeight: '500',
  },
  infoSection: {
    padding: Spacing.md,
    backgroundColor: Colors.surface,
    marginTop: Spacing.md,
  },
  sectionTitle: {
    fontSize: Fonts.large,
    fontWeight: 'bold',
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  infoText: {
    fontSize: Fonts.medium,
    color: Colors.text.primary,
    marginLeft: Spacing.md,
    flex: 1,
  },
  notesText: {
    fontSize: Fonts.medium,
    color: Colors.text.primary,
    lineHeight: 22,
  },
  bottomButtons: {
    padding: Spacing.md,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  editButton: {
    marginBottom: Spacing.sm,
  },
  deleteButton: {
    borderColor: Colors.accent,
  },
  errorContainer: {
    flex: 1,
    padding: Spacing.xl,
  },
  errorText: {
    fontSize: Fonts.large,
    color: Colors.text.secondary,
    marginBottom: Spacing.lg,
  },
});

export default ContactDetailsScreen;